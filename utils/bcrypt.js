const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUND);

const bcryptText = async (text) => {
  const salt = await bcrypt.genSalt(saltRounds);

  const resultText = await bcrypt.hash(text, salt);
  return resultText;
};

const isEqualPassword = async (original, encrypt) => {
  try {
    return await bcrypt.compare(original, encrypt);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  bcryptText,
  isEqualPassword,
};
