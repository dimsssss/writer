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

  test("본인 게시글이고 패스워드가 동일하다면 게시글을 수정할 수 있다", async () => {
    // when
    const data = require("../dummy.json").create.emojiArticle;
    const updateData = require("../dummy.json").update.emojiArticle;
    const { updateUserArticle } = require("../../article/articleService");
    const { convertPasswordInArticle } = require("../../article/articleDecorator");
    const { articles } = require("../../bin/database");
    // then
    const article = await articles.create(await convertPasswordInArticle(data), { raw: true });
    const result = await updateUserArticle({ ...updateData, articleId: article.articleId });
    expect(result).toEqual([1]);

    const updateArticle = await articles.findByPk(article.sequenceId, { raw: true });

    expect(updateArticle.userId).toEqual(updateData.userId);
    expect(updateArticle.title).toEqual(updateData.title);
    expect(updateArticle.content).toEqual(updateData.content);
  });

  test("본인 게시글이고 패스워드가 다르면 게시글을 수정할 수 없다", async () => {});

  test("남의 게시글이고 패스워드가 같으면 게시글을 수정할 수 없다", async () => {});

  test("남의 게시글이고 패스워드가 다르면 게시글을 수정할 수 없다", async () => {});
});
