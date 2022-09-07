const express = require("express");
const router = express.Router();
const { validateArticle, updateArticleBody, deleteArticleBody, getArticleQuery } = require("./articleValidator");
const articleController = require("./articleController");

router.post("/", validateArticle, articleController.postArticle);
router.patch("/", updateArticleBody, articleController.updateArticle);
router.delete("/", deleteArticleBody, articleController.deleteArticle);
router.get("/", getArticleQuery, articleController.getArticles);

module.exports = router;
