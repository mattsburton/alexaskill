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
                  'mongodb://mattb:mongodb://mattb:mrbarbie9@cluster0-shard-00-00-bwu5m.mongodb.net:27017,cluster0-shard-00-01-bwu5m.mongodb.net:27017,cluster0-shard-00-02-bwu5m.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin@cluster0-shard-00-00-bwu5m.mongodb.net:27017,cluster0-shard-00-01-bwu5m.mongodb.net:27017,cluster0-shard-00-02-bwu5m.mongodb.net:27017/timeline-app?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

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


                var quoteSchema = new Schema({
                        name : String,
                        quote : String
                });


                var quoteModel = mongoose.model('Quote', quoteSchema);

                // make this available to our users in our Node applications
                module.exports = quoteModel;
