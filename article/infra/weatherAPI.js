require("dotenv").config();
const http = require("http");
const ExternalSystemException = require("../exception/ExternalSystemException");
const options = {
  hostname: process.env.WEATHER_BASE,
  path: `/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=seoul`,
};

const getWeatherJson = () => {
  return new Promise((resoleve, rejects) => {
    const req = http.get(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", (d) => {
        resoleve(d);
      });
      req.on("error", (error) => {
        rejects(error);
      });
    });
  });
};

const getTodayWeather = async () => {
  try {
    const result = await getWeatherJson();
    return JSON.parse(result);
  } catch (err) {
    throw new ExternalSystemException(err);
  }
};

module.exports = {
  getTodayWeather,
};
