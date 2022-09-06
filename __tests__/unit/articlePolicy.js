describe("게시글 삭제 정책 테스트", () => {
  const { deletePolicy } = require("../../article/articlePolicy");
  const data = require("./dummy.json").deletePolicy;

  it.each(data)("%p", async (input) => {
    const [articleInfomation, article] = input;
    const UnValidResultException = require("../../article/exception/UnValidResultException");
    try {
      expect(await deletePolicy(articleInfomation, article)).rejects.toThrowError(UnValidResultException);
    } catch (err) {}
  });
});
