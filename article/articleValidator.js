const { body, oneOf, query } = require("express-validator");
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

const updateArticleBody = [
  body("title").isLength({ min: 1, max: 20 }),
  body("content").isLength({ min: 1, max: 200 }),
  body("articleId").isUUID(uuidVersion),
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

const deleteArticleBody = [
  body("articleId").isUUID(uuidVersion),
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

const getArticleQuery = oneOf([[query("sequenceId").isInt({ min: 1 })], [query("sequenceId").isEmpty()]]);

module.exports = {
  validateArticle,
  updateArticleBody,
  deleteArticleBody,
  getArticleQuery,
};
