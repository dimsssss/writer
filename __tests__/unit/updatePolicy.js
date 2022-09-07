describe("게시글 수정 정책 테스트", () => {
  const { updatePolicy } = require("../../article/articlePolicy");
  const data = require("./dummy.json").updatePolicy;

  it.each(data)("%p", async (input) => {
    const [articleInfomation, article] = input;
    const UnValidResultException = require("../../article/exception/UnValidResultException");
    try {
      expect(await updatePolicy(articleInfomation, article)).rejects.toThrowError(UnValidResultException);
    } catch (err) {}
  });
});
