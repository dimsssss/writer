describe("게시글 통합테스트 입니다", () => {
  const articleHelper = require("../testHelper");

  afterAll(async () => {
    await articleHelper.clearArticleTable();
  });

  test("게시글을 생성할 수 있다", async () => {
    const data = require("../dummy.json").create.article;
    const { postUserArticle } = require("../../article/articleService");
    const result = await postUserArticle(data);

    expect(result.userId).toEqual(data.userId);
    expect(result.title).toEqual(data.title);
    expect(result.content).toEqual(data.content);
  });

  test("게시글은 이모지가 포함될 수 있다", async () => {
    const data = require("../dummy.json").create.emojiArticle;
    const { postUserArticle } = require("../../article/articleService");
    const result = await postUserArticle(data);

    expect(result.userId).toEqual(data.userId);
    expect(result.title).toEqual(data.title);
    expect(result.content).toEqual(data.content);
  });
});
