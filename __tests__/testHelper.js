const { articles } = require("../bin/database");

const clearArticleTable = async () => {
  await articles.destroy({ where: {}, force: true });
};

module.exports = { clearArticleTable };
