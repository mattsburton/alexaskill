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

//Express routes to save and serve data - we should move this to a sperate file for transparancy
app.post('/addQuote', (req, res) => {
  var newQuote = quote({ //This builds up the JSON array from the form
    name: req.body.name,
    quote: req.body.quote
  });
   newQuote.save(function(err) {
     if (err) throw err;
   })
  res.redirect('/')
})


app.get('/api/quotes', function(req, res) {
         // use mongoose to get all todos in the database
         quote.find(function(err, quotes) {
           if (err)
               res.send(err)
           res.json(quotes); // return all todos in JSON format
         });
});

// application -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html'); // load the single view file (angular will handle the page changes on the front-end) Essentially the form!
    });


app.listen(3000, function() {
  console.log('listening on 3000')
})
