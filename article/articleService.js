const { convertPasswordInArticle, splitArticleAndFindCondition } = require("./articleDecorator");
const articleRepository = require("./articleRepository");
const { deletePolicy } = require("./articlePolicy");
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

const deleteUserArticle = async (articleInfomation) => {
  const article = await articleRepository.getArticle(articleInfomation.articleId);

  await deletePolicy(articleInfomation, article);

  const [_, condition] = await splitArticleAndFindCondition(articleInfomation, article.password);
  return await articleRepository.deleteArticle(condition);
};

module.exports = {
  postUserArticle,
  updateUserArticle,
  deleteUserArticle,
};
