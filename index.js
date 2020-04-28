const request = require('request');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let yourRate = req.body.yourRate;
  let exchangeRate = req.body.exchangeRate;
  let amount = req.body.amount;

  let queryURL = "https://api.nomics.com/v1/markets?key=" + process.env.NOMICS_API_KEY;
  let priceURL = "https://api.nomics.com/v1/prices?key=4329bd0fa529e2db192f7f80b06542a2";

  let options = {
    url: queryURL,
    method: "GET",
    qs: {
      from: yourRate,
      to: exchangeRate,
      amount: amount
    }
  }

  axios.get(priceURL)
    .then(response => {
      res.send(response.data);
      console.log(response.data);
    }).catch(err => {
      console.log("Error fetching from NOMICS", err);
    });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
})

