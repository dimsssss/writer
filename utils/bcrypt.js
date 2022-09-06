const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUND);

const bcryptText = async (text) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const resultText = await bcrypt.hash(text, salt);
  return resultText;
};

const compareText = async (original, encrypt) => {
  return await bcrypt.compare(original, encrypt);
};

module.exports = {
  bcryptText,
  compareText,
};
