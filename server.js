// server.js
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

app.get("/api/timestamp/:date", function (req, res) {
  if (/^\d{5,}$/.test(req.params.date)) {
    return res.json({
      unix: parseInt(req.params.date),
      utc: new Date(parseInt(req.params.date)).toUTCString()
    });
  }

  const date = new Date(req.params.date);

  if (date.toString() === "Invalid Date") {
    return res.json({
      error: "Invalid Date"
    });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get("/api/timestamp", function (req, res) {
  const date = new Date();

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || '3000', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});