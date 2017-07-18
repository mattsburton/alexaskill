// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/timeline-app');

var quoteSchema = new Schema({
        name : String,
        quote : String
});


var quoteModel = mongoose.model('Quote', quoteSchema);

// make this available to our users in our Node applications
module.exports = quoteModel;
