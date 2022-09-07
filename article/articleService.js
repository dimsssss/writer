const { convertPasswordInArticle, splitArticleAndFindCondition, insertTodayWeather } = require("./articleDecorator");
const articleRepository = require("./infra/articleRepository");
const weatherAPI = require("./infra/weatherAPI");
const { deletePolicy, updatePolicy } = require("./articlePolicy");

const postUserArticle = async (article) => {
  const convertedArticle = await convertPasswordInArticle(article);
  const todayWeather = await weatherAPI.getTodayWeather();
  const resultArticle = insertTodayWeather(convertedArticle, todayWeather);
  return await articleRepository.crateArticle(resultArticle);
};

const updateUserArticle = async (articleInfomation) => {
  const article = await articleRepository.getArticle(articleInfomation.articleId);
  await updatePolicy(articleInfomation, article);
  const [updateArticle, condition] = await splitArticleAndFindCondition(articleInfomation, article.password);
  return await articleRepository.updateArticle(updateArticle, condition);
};

const deleteUserArticle = async (articleInfomation) => {
  const article = await articleRepository.getArticle(articleInfomation.articleId);

  await deletePolicy(articleInfomation, article);

  const [_, condition] = await splitArticleAndFindCondition(articleInfomation, article.password);
  return await articleRepository.deleteArticle(condition);
};

const getUserArticles = async (sequenceId) => {
  return await articleRepository.findArticle(sequenceId);
};

module.exports = {
  postUserArticle,
  updateUserArticle,
  deleteUserArticle,
  getUserArticles,
};
