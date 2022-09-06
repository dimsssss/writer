const { articles } = require("../bin/database");
const DatabaseException = require("./exception/DatabasException");

const crateArticle = async (article) => {
  try {
    return await articles.create(article, { raw: true });
  } catch (err) {
    throw new DatabaseException(err);
  }
};

const getPassword = async (articleId) => {
  try {
    const result = await articles.findOne({ where: { articleId }, raw: true });
    return result.password;
  } catch (err) {
    throw err;
  }
};

const updateArticle = async (article, condition) => {
  try {
    const result = await articles.update(article, { where: condition });
    return result;
  } catch (err) {
    throw new DatabaseException(err);
  }
};

module.exports = { crateArticle, updateArticle, getPassword };
