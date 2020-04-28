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
  let currency = req.body.currency;
  let crypto = req.body.crypto;
  let amount = req.body.amount;

  // let queryURL = "https://api.nomics.com/v1/markets?key=" + process.env.NOMICS_API_KEY;
  // let priceURL = "https://api.nomics.com/v1/prices?key=4329bd0fa529e2db192f7f80b06542a2";
  // let currencyURL = "https://api.nomics.com/v1/currencies/ticker?key=4329bd0fa529e2db192f7f80b06542a2";
  let exchangeRate = "https://api.nomics.com/v1/exchange-rates?key=4329bd0fa529e2db192f7f80b06542a2"

  axios.get(exchangeRate)
    .then(response => {
      // res.send(response.data);
      // console.log(response.data);
      //needs hardcode or loop for each crypto type, convert from currency to crypto

      //create date
      let date = new Date();
      //show date
      res.write("<p>Todays Date: " + date.toLocaleDateString());
      //need to find correct conversion formula
      res.write("<h1>" + amount + " " + currency + " is currently worth " + response.data[1].rate * amount + " " + crypto);

    }).catch(err => {
      console.log("Error fetching from NOMICS", err);
    });
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
})

