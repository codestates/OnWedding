var express = require("express");
const controllers = require("../controllers/auths");
var router = express.Router();

/* GET users listing. */
router.post("/login", controllers.login.post);
router.post("/logout", controllers.logout.post);
router.post("/signup", controllers.signup.post);
router.post("/email", controllers.email.post);
router.post("/nickname", controllers.nickname.post);

module.exports = router;
