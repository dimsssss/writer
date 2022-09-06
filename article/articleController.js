const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { postUserArticle, updateUserArticle, deleteUserArticle } = require("./articleService");

const postArticle = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }

  try {
    const article = req.body;
    const result = await postUserArticle(article);
    return res.status(StatusCodes.OK).send(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

const updateArticle = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }

  try {
    const article = req.body;
    const result = await updateUserArticle(article);
    return res.status(StatusCodes.OK).send(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

const deleteArticle = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }

  try {
    const article = req.body;
    const result = await deleteUserArticle(article);
    return res.status(StatusCodes.OK).send(result);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
};

module.exports = {
  postArticle,
  updateArticle,
  deleteArticle,
};
