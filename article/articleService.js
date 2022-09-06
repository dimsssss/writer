const { convertPasswordInArticle, splitArticleAndFindCondition } = require("./articleDecorator");
const articleRepository = require("./articleRepository");
const UnValidResultException = require("./exception/UnValidResultException");

const postUserArticle = async (article) => {
  const convertedArticle = await convertPasswordInArticle(article);
  return await articleRepository.crateArticle(convertedArticle);
};

const updateUserArticle = async (article) => {
  const encryptPassword = await articleRepository.getPassword(article.articleId);
  const [updateArticle, condition] = await splitArticleAndFindCondition(article, encryptPassword);
  return await articleRepository.updateArticle(updateArticle, condition);
};

const deleteUserArticle = async (article) => {
  const encryptPassword = await articleRepository.getPassword(article.articleId);
  if (!encryptPassword) {
    throw new UnValidResultException();
  }

  const [_, condition] = await splitArticleAndFindCondition(article, encryptPassword);
  return await articleRepository.deleteArticle(condition);
};

module.exports = {
  postUserArticle,
  updateUserArticle,
  deleteUserArticle,
};
