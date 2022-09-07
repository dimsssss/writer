const { articles } = require("../bin/database");

const clearArticleTable = async () => {
  await articles.destroy({ where: {}, force: true });
};

const createDummyArticle = async () => {
  const { articles } = require("../bin/database");
  const userId = "5f04f51b-64de-4200-a2d2-7033de275f7b";
  const result = [];
  const articleDummy = [];
  for (let i = 1; i < 51; i += 1) {
    const article = {
      userId,
      title: String(i),
      content: String(i),
      password: String(i),
    };
    articleDummy.push(article);
  }
  result.push(await articles.bulkCreate(articleDummy, { raw: true }));

  return result.flatMap((article) => article);
};

module.exports = { clearArticleTable, createDummyArticle };
