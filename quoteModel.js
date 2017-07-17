// require mongoose to act as our middleware
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1/timeline-app');

var quoteSchema = new Schema({ //This is the main schema that defines what is saved in the database - fields/names etc.
        name : String,
        quote : String
});


var quoteModel = mongoose.model('Quote', quoteSchema);

// make this available to our users in our Node applications
module.exports = quoteModel;
