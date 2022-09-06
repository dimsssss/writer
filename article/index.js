const express = require("express");
const router = express.Router();
const { validateArticle } = require("./articleValidator");
const articleController = require("./articleController");

router.post("/", validateArticle, articleController.postArticle);

module.exports = router;
