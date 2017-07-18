var http = require('http');
const express = require('express');
const bodyParser= require('body-parser')
const app = express()
var quote = require('./quoteModel');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// create a new quote


//Save the quote to mongo


// application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


app.listen(3000, function() {
  console.log('listening on 3000')
})
