require("dotenv").config();

module.exports = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: process.env.DIALECT,
  timezone: process.env.TIMEZONE,
  pool: {
    min: process.env.MIN,
    max: process.env.MAX,
  },
};
