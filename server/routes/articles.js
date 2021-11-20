var express = require("express");
const controllers = require("../controllers/articles");
var router = express.Router();

/* GET users listing. */
router.get("/", controllers.articles.get);
router.post("/:id", controllers.article.post);
router.get("/:id", controllers.article.get);
router.patch("/:id", controllers.article.patch);
router.delete("/:id", controllers.article.delete);
router.get("/tag/:id", controllers.hashtag.get);

module.exports = router;
