const { articles, Sequelize } = require("../bin/database");
const { Op } = Sequelize;
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

const getArticle = async (articleId) => {
  try {
    const result = await articles.findOne({ where: { articleId }, raw: true });
    return result;
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

const deleteArticle = async (condition) => {
  try {
    const result = await articles.destroy({ where: condition });
    return result;
  } catch (err) {
    throw new DatabaseException(err);
  }
};

const findArticle = async (sequenceId) => {
  try {
    let condition;
    if (sequenceId === undefined) {
      condition = {};
    } else {
      condition = {
        sequenceId: {
          [Op.lt]: sequenceId,
        },
      };
    }
    const result = await articles.findAll({
      where: condition,
      order: [["sequenceId", "DESC"]],
      limit: 20,
    });
    return result;
  } catch (err) {
    console.log(err);
    throw new DatabaseException(err);
  }
};

module.exports = { crateArticle, updateArticle, getPassword, deleteArticle, getArticle, findArticle };
