// require mongoose to act as our middleware
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

                // Here we find an appropriate database to connect to, defaulting to
                // localhost if we don't find one.
                var uristring =
                  process.env.MONGODB_URI ||
                  'mongodb://localhost/HelloMongoose';

                // The http server will listen to an appropriate port, or default to
                // port 5000.
                var theport = process.env.PORT || 5000;

                // Makes connection asynchronously.  Mongoose will queue up database
                // operations and release them when the connection is complete.
                mongoose.connect(uristring, function (err, res) {
                  if (err) {
                    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
                  } else {
                    console.log ('Succeeded connected to: ' + uristring);
                  }
                });
