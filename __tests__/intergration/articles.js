describe("게시글 통합테스트 입니다", () => {
  const articleHelper = require("../testHelper");

  afterAll(async () => {
    await articleHelper.clearArticleTable();
  });

  test("게시글을 생성할 수 있다", async () => {
    const data = require("./dummy.json").create.article;
    const { postUserArticle } = require("../../article/articleService");
    const result = await postUserArticle(data);

    expect(result.userId).toEqual(data.userId);
    expect(result.title).toEqual(data.title);
    expect(result.content).toEqual(data.content);
  });

  test("게시글은 이모지가 포함될 수 있다", async () => {
    const data = require("./dummy.json").create.emojiArticle;
    const { postUserArticle } = require("../../article/articleService");
    const result = await postUserArticle(data);

    expect(result.userId).toEqual(data.userId);
    expect(result.title).toEqual(data.title);
    expect(result.content).toEqual(data.content);
  });

  test("본인 게시글이고 패스워드가 동일하다면 게시글을 수정할 수 있다", async () => {
    // when
    const data = require("./dummy.json").create.emojiArticle;
    const updateData = require("./dummy.json").update.emojiArticle;
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

  test("본인 게시글이고 패스워드가 같으면 게시글을 삭제할 수 있다", async () => {
    // when
    const data = require("./dummy.json").create.emojiArticle;
    const { deleteUserArticle } = require("../../article/articleService");
    const { convertPasswordInArticle } = require("../../article/articleDecorator");
    const { articles } = require("../../bin/database");
    // then
    const article = await articles.create(await convertPasswordInArticle(data), { raw: true });
    const deleteData = {
      articleId: article.articleId,
      userId: article.userId,
      password: data.password,
    };

    const deletedRowCount = await deleteUserArticle(deleteData);
    expect(deletedRowCount).toEqual(1);

    const deletedArticle = await articles.findByPk(article.sequenceId);
    expect(deletedArticle).toEqual(null);
  });

  test("본인 게시글이고 패스워드가 다르면 게시글을 삭제할 수 없다", async () => {
    // when
    const data = require("./dummy.json").create.emojiArticle;
    const { deleteUserArticle } = require("../../article/articleService");
    const { convertPasswordInArticle } = require("../../article/articleDecorator");
    const { articles } = require("../../bin/database");
    // then
    const article = await articles.create(await convertPasswordInArticle(data), { raw: true });
    // 다른 패스워드로 수정
    const deleteData = {
      articleId: article.articleId,
      userId: article.userId,
      password: "123455",
    };

    const UnValidResultException = require("../../article/exception/UnValidResultException");
    await expect(deleteUserArticle(deleteData)).rejects.toThrowError(UnValidResultException);
  });

  test("남의 게시글이고 패스워드가 같으면 게시글을 삭제할 수 없다", async () => {
    // when
    const datas = require("./dummy.json").delete.articles;
    const { deleteUserArticle } = require("../../article/articleService");
    const { convertPasswordInArticle } = require("../../article/articleDecorator");
    const { articles } = require("../../bin/database");
    // then
    const firstArticle = await articles.create(await convertPasswordInArticle(datas[0]), { raw: true });
    const secondArticle = await articles.create(await convertPasswordInArticle(datas[1]), { raw: true });
    const deleteData = {
      articleId: secondArticle.articleId,
      userId: firstArticle.userId,
      password: datas[1].password,
    };

    const UnValidResultException = require("../../article/exception/UnValidResultException");
    await expect(deleteUserArticle(deleteData)).rejects.toThrowError(UnValidResultException);
  });

  test("남의 게시글이고 패스워드가 다르면 게시글을 삭제할 수 없다", async () => {
    // when
    const datas = require("./dummy.json").delete.articles;
    const { deleteUserArticle } = require("../../article/articleService");
    const { convertPasswordInArticle } = require("../../article/articleDecorator");
    const { articles } = require("../../bin/database");
    // then
    const firstArticle = await articles.create(await convertPasswordInArticle(datas[0]), { raw: true });
    const secondArticle = await articles.create(await convertPasswordInArticle(datas[1]), { raw: true });
    const deleteData = {
      articleId: secondArticle.articleId,
      userId: firstArticle.userId,
      password: "abcdefg",
    };

    const UnValidResultException = require("../../article/exception/UnValidResultException");
    await expect(deleteUserArticle(deleteData)).rejects.toThrowError(UnValidResultException);
  });

  test("sequenceId가 없다면 가장 최근 글 20개를 가져온다", async () => {
    const { getUserArticles } = require("../../article/articleService");
    const dummy = await articleHelper.createDummyArticle();
    const articles = await getUserArticles();
    const reverseDummy = dummy.reverse();

    expect(articles.length).toEqual(20);

    for (let i = 0; i < 20; i += 1) {
      expect(reverseDummy[i].title).toEqual(articles[i].title);
      expect(reverseDummy[i].content).toEqual(articles[i].content);
      expect(reverseDummy[i].password).toEqual(articles[i].password);
    }
  });

  test("입력 sequenceId 보다 오래된 글 20개를 가져온다", async () => {
    const { getUserArticles } = require("../../article/articleService");
    const dummy = await articleHelper.createDummyArticle();
    const middleArticleId = dummy[25].sequenceId;
    const articles = await getUserArticles(middleArticleId);

    expect(articles.length).toEqual(20);

    for (const article of articles) {
      expect(article.sequenceId).toBeLessThan(middleArticleId);
    }
  });
});
