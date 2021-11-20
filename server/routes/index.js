var express = require("express");
var router = express.Router();
const authsRouter = require("./auths");
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");

router.use("/auth", authsRouter);
router.use("/user", usersRouter);
router.use("/article", articlesRouter);
router.use("/comment", commentsRouter);

module.exports = router;
