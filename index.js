// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//e.g [project url]/api/2015-12-25
//{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

app.get("/api/timestamp/", function (req, res) {

  let date = new Date();
  
  res.json({
    "unix": date.getTime(), 
    "utc": date.toUTCString()
  });
});

// your first API endpoint... 

app.get("/api/timestamp/:date_str", function (req, res) {
  const { date_str } = req.params;

  let date = new Date(date_str);

  if(date.toString() === 'Invalid Date') {
    date = new Date(parseInt(date_str));
  }
  
  if(date.toString() === 'Invalid Date') {
    return res.json({ "error": "Invalid Date" });
  } else {
   return res.json({
      "unix": date.getTime(), 
      "utc": date.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
