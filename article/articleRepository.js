const { articles } = require("../bin/database");
const DatabaseException = require("./exception/DatabasException");

const crateArticle = async (article) => {
  try {
    return await articles.create(article, { raw: true });
  } catch (err) {
    throw new DatabaseException(err);
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

module.exports = { crateArticle, updateArticle };
