'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    alexaVerifier = require('alexa-verifier'); // at the top of our file

let app = express();

function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}


app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));


app.get('/', function(req, res) {

  var textArray = [
      "Money is the wealthy man's curtain which hides all his defects from the world.",
      "Worry is a down payment on a problem you may never have.",
      "I don't know the key to success, but the key to failure is trying to please everybody.",
      "Great spirits have always faced violent opposition from mediocre minds. - Einstein",
      "A positive attitude may not solve all your problems, but it will annoy enough people to make it worth the effort. - Herm Albright",
      "Everything has Beauty"
  ];
  var randomNumber = Math.floor(Math.random()*textArray.length);


  var randomText = textArray[randomNumber];

    res.json({ message: 'The forecaster is up and running.T' +randomText, since: (new Date()).toString() });
});

app.get('/forecast', requestVerifier, function(req, res) {
  if (req.body.request.type === 'LaunchRequest') { /* ... */ }
  else if (req.body.request.type === 'SessionEndedRequest') { /* ... */ }
  else if (req.body.request.type === 'IntentRequest' &&
           req.body.request.intent.name === 'Forecast') {

    if (!req.body.request.intent.slots.Day ||
        !req.body.request.intent.slots.Day.value) {
      // Handle this error by producing a response like:
      // "Hmm, what day do you want to know the forecast for?"
    }
    let day = new Date(req.body.request.intent.slots.Day.value);

    // Do your business logic to get weather data here!
    // Then send a JSON response...

    var textArray = [
        "Money is the wealthy man's curtain which hides all his defects from the world.",
        "Worry is a down payment on a problem you may never have.",
        "I don't know the key to success, but the key to failure is trying to please everybody.",
        "Great spirits have always faced violent opposition from mediocre minds. - Einstein",
        "A positive attitude may not solve all your problems, but it will annoy enough people to make it worth the effort. - Herm Albright",
        "Everything has Beauty"
    ];
    var randomNumber = Math.floor(Math.random()*textArray.length);


    var randomText = textArray[randomNumber];


    res.json({
      "version": "1.0",
      "response": {
        "shouldEndSession": true,
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak>Working?</speak>"
        }
      }
    });
  }
});

app.listen(app.get('port'), function() {
    console.log('Forecaster is up and running on port %d', app.get('port'));
});
