'use strict';

let request = require('request');

const VERSION = '1.0';
const BASE_URL = 'https://api.forecast.io/forecast/' + process.env.WEATHER_API_KEY + '/38.9649734,-77.0207249';
const IMAGE_BASE = process.env.WEATHER_IMAGE_BASE;

module.exports = function(req, res) {

    console.log('New request for the forecaster:\n', req.body);

    if (req.body.request.type === 'LaunchRequest') {
        res.json(
            buildResponse(
                { dateRequested: true },
                '<speak>I can tell you the weather<break time="1s"/> but you must give me a day!</speak>',
                {},
                false
            )
        );

    } else if (req.body.request.type === 'SessionEndedRequest') {

       if (req.body.request.reason === 'ERROR') {
           console.error('Alexa ended the session due to an error');
       }
       /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        Per Alexa docs, we shouldn't send ANY response here... weird, I know.
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    } else if (req.body.request.type === 'IntentRequest' &&
               req.body.request.intent.name === 'Weather') {

        if (req.body.request.intent.slots.When &&
            req.body.request.intent.slots.When.value) {

            getWeather(new Date(req.body.request.intent.slots.When.value))
                .then(function(weather) {
                    console.log('responding to weather request for ' + req.body.request.intent.slots.When.value + ' with ', weather);
                    res.json(
                        buildResponse( {}, '<speak>' + weather.text + '</speak>', weather.card, true )
                    );
                })
                .catch(function(err) {
                    res.json(
                        buildResponse( {}, '<speak>' + err + '</speak>', {}, true )
                    );
                });

        } else {

            if (req.body.session.attributes &&
                req.body.session.attributes.dateRequested) {
                res.json(
                    buildResponse(
                        {},
                        '<speak>If you don\'t want to hear the weather then leave me alone.</speak>',
                        {},
                        true
                    )
                );
            } else {
                res.json(
                    buildResponse(
                        { dateRequested: true },
                        '<speak>I can tell you the weather<break time="1s"/> but you must give me a day!</speak>',
                        {},
                        false
                    )
                );
            }
        }

    } else {
        console.error('Intent not implemented: ', req.body);
        res.status(504).json({ message: 'Intent Not Implemented' });
    }

};


function buildResponse(session, speech, card, end) {
    return {
        version: VERSION,
        sessionAttributes: session,
        response: {
            outputSpeech: {
                type: 'SSML',
                ssml: speech
            },
            card: card,
            shouldEndSession: !!end
        }
    };
}


function getWeather(day) {
    return new Promise(function(resolve, reject) {
        if (!day || day.toString() === 'Invalid Date') {
            return reject('Invalid date for weather!');
        }

        request({
            url: BASE_URL,
            json: true
        }, function(err, res, body) {
            let data, text, card,
                simpleDate = day.toISOString().split('T')[0];

            if (err || res.statusCode >= 400) {
                console.error(res.statusCode, err);
                return reject('Unable to get weather data!');
            }

            body.daily.data.forEach(function(dailyData) {
                if ((new Date(dailyData.time * 1000)).toISOString().split('T')[0] === simpleDate) {
                    data = dailyData;
                }
            });

            if (!data) {
                return reject('I have no data for that day!');
            }

            text = getWeatherText(data);
            card = {
                type: 'Standard',
                title: 'Weather for ' + simpleDate,
                text: text,
                image: {
                    smallImageUrl: IMAGE_BASE + data.icon + '.png',
                    largeImageUrl: IMAGE_BASE + data.icon + '.png'
                }
            };

            resolve( { text, card } );
        });
    });
}


function getWeatherText(data) {
    let conditions;

    if (data.precipProbability > 0.7 && data.precipIntensityMax > 0.05) {
        if (data.precipType === 'rain') {
            conditions = 'Don\'t forget your umbrella.';
        } else {
            conditions = 'Brace yourself for the snow.';
        }
    } else if (data.temperatureMax > 93 || data.apparentTemperatureMax > 98) {
        if (data.dewPoint > 72 || data.humidity > 0.75) {
            conditions = 'It\'s going to be nasty.';
        } else {
            conditions = 'Prepare for a scorcher.';
        }
    } else if (data.temperatureMax < 35) {
        if (data.windSpeed > 15) {
            conditions = 'Prepare for bitter cold wind in your face.';
        } else {
            conditions = 'Bitterly cold temperatures are in store for.';
        }
    } else if (data.dewPoint > 72 && data.humidity > 0.75) {
        conditions = 'The humidity is going to be brutal.';
    } else if (data.cloudCover > 0.85) {
        conditions = 'It will be very cloudy.';
    } else if (data.cloudCover < 0.1) {
        if (data.windSpeed > 15) {
            conditions = 'Lots of sun and breezy conditions are in store.';
        } else {
            conditions = 'There will be lots of sunshine.';
        }
    } else if (data.windSpeed > 20) {
        conditions = 'It\'s going to be gusty.';
    } else {
        conditions = 'Looks like an average day.';
    }

    return conditions;
}
