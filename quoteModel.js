const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Connect to MongoDB on localhost:27017


var uri = 'mongodb://mattb:mrbarbie9@cluster0-shard-00-00-bwu5m.mongodb.net:27017,cluster0-shard-00-01-bwu5m.mongodb.net:27017,cluster0-shard-00-02-bwu5m.mongodb.net:27017/quotes?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(uri, function(error) {
  // if error is truthy, the initial connection failed.
  console.log(error);
})


// Create a model and insert a new doc
//const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
//Test.create({ name: 'Val' }).then(doc => console.log(doc));
//console.log('Banana2');



var quoteSchema = new Schema({
        name : String,
        quote : String
});


var quoteModel = mongoose.model('Quote', quoteSchema);

// make this available to our users in our Node applications
module.exports = quoteModel;
