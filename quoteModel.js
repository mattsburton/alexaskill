// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://mattb:mrbarbie9@cluster0-shard-00-00-bwu5m.mongodb.net:27017,cluster0-shard-00-01-bwu5m.mongodb.net:27017,cluster0-shard-00-02-bwu5m.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var quoteSchema = new Schema({
        name : String,
        quote : String
});


var quoteModel = mongoose.model('Quote', quoteSchema);

// make this available to our users in our Node applications
module.exports = quoteModel;
