const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const publicDirectoryPath = path.join(__dirname, "./website");
const app = express();
app.use(cors());
const port = 3000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicDirectoryPath));

///////////
const request = require("request");
const apiKey = "a6e5b772926f26d6e8a89011d8e0701b&units=imperial";
const openWeatherMap = (zip, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${apiKey}`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.cod >= 400 && body.cod < 500) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        location: body.name,
        forecast: body.weather[0].description,
        temperature: body.main.temp,
        country: body.sys.country,
      });
    }
  });
};

//////////////////////////////
app.get("/weather", (req, res) => {
  if (!req.query.zip) {
    return res.send({
      error: "you must provide zip code",
    });
  }
  openWeatherMap(
    req.query.zip,
    (error, { location, forecast, temperature, country } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast,
        location,
        temperature,
        country,
        date: new Date().toDateString(),
        zipcode: req.query.zip,
      });
    }
  );
});
/////
app.post("/postweather", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
});
/////
app.get("*", (req, res) => {
  res.send("404 page");
});
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
