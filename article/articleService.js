const { convertPasswordInArticle } = require("./articleDecorator");
const articleRepository = require("./articleRepository");

const postUserArticle = async (article) => {
  const convertedArticle = await convertPasswordInArticle(article);
  return await articleRepository.crateArticle(convertedArticle);
};

module.exports = {
  postUserArticle,
};
