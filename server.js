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
  console.log(req.query.hasOwnProperty("date"));
  if(req.query.hasOwnProperty("date")) {
    if(req.query.date !== '') {
      let time = req.query.date;
      if(!time.includes("-")) {
        time = parseInt(req.query.date);
      }
      let date = new Date(time); 
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    } else {
      let date = new Date();
      res.json({unix: date.getTime(), utc: date.toUTCString()});
    }
  } else {
     let date = new Date();
     res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});


app.get("/api/timestamp/:time", function (req, res) {
  let time = req.params.time;
  if(!time.includes("-")) {
    time = parseInt(req.params.time);
  }
  let date = new Date(time); 
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});