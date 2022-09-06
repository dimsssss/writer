const UnValidResultException = require("./exception/UnValidResultException");
const { isEqualPassword } = require("../utils/bcrypt");

const deletePolicy = async (articleInput, article) => {
  if (articleInput.userId !== article.userId) {
    throw new UnValidResultException();
    // "게시글 작성자가 다릅니다"
  } else if (!(await isEqualPassword(articleInput.password, article.password))) {
    throw new UnValidResultException();
    // "게시글 패스워드가 다릅니다"
  }
};

module.exports = { deletePolicy };
