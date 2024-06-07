// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api", function (req, res) {
  let fecha = new Date()
  response = { unix: fechaToUnix(fecha), utc: fecha.toUTCString() }
  res.json(response);
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"

app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date)
  if (isInvalidDate(date)) {
    date = new Date(+req.params.date)
  }

  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" })
    return;
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});
// app.get("/api/:date", function (req, res) {
//   let date = req.params.date
//   const fechaInput = new Date(date)
//   let datePlus = new Date(+req.params.date)
//   //If the input is a number
//   if (fechaInput instanceof Date && /^\d+$/.test(date)) {
//     response = {
//       unix: datePlus.getTime(),
//       utc: datePlus.toUTCString()
//     }
//     //If the input is a string
//   } else if (fechaInput instanceof Date && /^\d+\-\d+\-\d+$/.test(date)) {
//     response = {
//       unix: datePlus.getTime(),
//       utc: datePlus.toUTCString()
//     }
//     //If the input is invalid
//   } else {
//     response = { error: "Invalid Date" }
//   }
//   console.log('Fecha', date, typeof date, response)
//   res.json(response);
// });

//This could be on another file..
const fechaToUnix = (fecha) => Math.floor(new Date(fecha).getTime())

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
