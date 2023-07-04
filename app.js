const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var cityName = req.body.cityName;
  //console.log(cityName);
  const query = cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(url, function (response) {
    //console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weathericon = weatherData.weather[0].icon;
      const imgurl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      //console.log(temp);
      //console.log(weatherDescription);
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees celsius</h1>"
      );
      res.write("<img src=" + imgurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on PORT 3000");
});
