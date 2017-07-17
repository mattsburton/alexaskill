// require mongoose to act as our middleware
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://heroku_cll2h38q:mrbarbie9@ds161742.mlab.com:61742/heroku_cll2h38q');

var quoteSchema = new Schema({ //This is the main schema that defines what is saved in the database - fields/names etc.
        name : String,
        quote : String
});


var quoteModel = mongoose.model('Quote', quoteSchema);

// make this available to our users in our Node applications
module.exports = quoteModel;
