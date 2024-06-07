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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let fecha = req.params.date
  const fechaInput = new Date(fecha)
  console.log('fecha', fecha, typeof fecha)
  if (fechaInput instanceof Date && /^\d+$/.test(fecha) ){
    let fechaUnix = new Date(fecha * 1)
    res.json({unix: Number(fecha), utc: fechaUnix.toUTCString()});
  } else if (fechaInput instanceof Date) {
    const fechaToUnix = Math.floor(new Date(fecha).getTime())
    res.json({unix: fechaToUnix, utc: fechaInput.toUTCString()});
  } else {
    res.json.console.error({error : "Invalid Date" });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
