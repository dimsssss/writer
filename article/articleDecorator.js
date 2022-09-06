const { bcryptText } = require("../utils/bcrypt");

const convertPasswordInArticle = async (article) => {
  const encryptPassword = await bcryptText(article.password);
  return { ...article, password: encryptPassword };
};

module.exports = {
  convertPasswordInArticle,
};
