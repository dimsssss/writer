const { articles, Sequelize } = require("../../bin/database");
const { Op } = Sequelize;
const ExternalSystemException = require("../exception/ExternalSystemException");

const crateArticle = async (article) => {
  try {
    return await articles.create(article, { raw: true });
  } catch (err) {
    throw new ExternalSystemException(err);
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
    throw new ExternalSystemException(err);
  }
};

const deleteArticle = async (condition) => {
  try {
    const result = await articles.destroy({ where: condition });
    return result;
  } catch (err) {
    throw new ExternalSystemException(err);
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
    throw new ExternalSystemException(err);
  }
};

module.exports = { crateArticle, updateArticle, getPassword, deleteArticle, getArticle, findArticle };
