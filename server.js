// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", function (req, res) { 
  let utc = new Date();
  let unix = Date.parse(utc);
  res.json({unix: unix, utc: utc.toUTCString()});
});

app.get("/api/timestamp/:time", function (req, res) {
  let utc = new Date(req.params.time);
  let unix = Date.parse(req.params.time);  
  res.json({unix: unix, utc: utc.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});