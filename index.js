const request = require('request');
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

  let queryURL = "https://blockchain.info/ticker";

  let options = {
    url: queryURL,
    method: "GET",
    qs: {
      from: yourRate,
      to: exchangeRate,
      amount: amount
    }
  }

  request(options, function (error, response, body) {
    let data = JSON.parse(body);
    let price = data.price;
    console.log(price);

    let currentDate = data.time;

    res.write("<p>Todays Date: " + currentDate + "</p>");

    res.write("<h1>" + amount + " " + yourRate + " is currently worth " + price + " " + exchangeRate + "</h1>");

    res.send();
  })
})

app.listen(3000, function () {
  console.log("Server running on port 3000");
})