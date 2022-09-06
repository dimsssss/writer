const { body, check } = require("express-validator");
const uuidVersion = 4;

const validateArticle = [
  body("title").isLength({ min: 1, max: 20 }),
  body("content").isLength({ min: 1, max: 200 }),
  body("userId").isUUID(uuidVersion),
  body("password").isStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  }),
];

module.exports = {
  validateArticle,
};
