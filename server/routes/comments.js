var express = require("express");
const controllers = require("../controllers/comments");
var router = express.Router();

/* GET users listing. */
router.post("/:userId/:articleId", controllers.comment.post);
router.patch("/:id", controllers.comment.patch);
router.delete("/:id", controllers.comment.delete);

module.exports = router;
