const { bcryptText, isEqualPassword } = require("../utils/bcrypt");
const UnValidResultException = require("./exception/UnValidResultException");

const convertPasswordInArticle = async (article) => {
  const encryptPassword = await bcryptText(article.password);
  return { ...article, password: encryptPassword };
};

const splitArticleAndFindCondition = async (article, encryptPassword) => {
  if (!(await isEqualPassword(article.password, encryptPassword))) {
    throw new UnValidResultException();
  }

  const condition = {
    userId: article.userId,
    articleId: article.articleId,
    password: encryptPassword,
  };

  const updateArticle = { title: article.title, content: article.content };
  return [updateArticle, condition];
};

module.exports = {
  convertPasswordInArticle,
  splitArticleAndFindCondition,
};
