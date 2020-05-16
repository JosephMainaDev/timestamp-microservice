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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Parse the date string
const timestamp = dateStr => {
  let date;

  if (!dateStr) {
    date = new Date();
  } else {
    date = Number.isInteger(+dateStr)
   ? new Date(+dateStr)
   : new Date(dateStr);
  }

  return isNaN(date.getTime())
    ? {error : "Invalid Date"}
    : {unix: date.getTime(), utc: date.toUTCString()};
}

// Timestamp API endpoint
app.get("/api/timestamp/:date_string?", (req, res) => {
  res.json(timestamp(req.params.date_string))
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});