const { convertPasswordInArticle, splitArticleAndFindCondition } = require("./articleDecorator");
const articleRepository = require("./articleRepository");

const postUserArticle = async (article) => {
  const convertedArticle = await convertPasswordInArticle(article);
  return await articleRepository.crateArticle(convertedArticle);
};

const updateUserArticle = async (article) => {
  const encryptPassword = await articleRepository.getPassword(article.articleId);
  const [updateArticle, condition] = await splitArticleAndFindCondition(article, encryptPassword);
  return await articleRepository.updateArticle(updateArticle, condition);
};

module.exports = {
  postUserArticle,
  updateUserArticle,
};
