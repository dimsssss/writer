const express = require("express");
const router = express.Router();
const { validateArticle, updateArticleBody } = require("./articleValidator");
const articleController = require("./articleController");

router.post("/", validateArticle, articleController.postArticle);
router.patch("/", updateArticleBody, articleController.updateArticle);

module.exports = router;
