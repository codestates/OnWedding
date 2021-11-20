var express = require("express");
const controllers = require("../controllers/users");
var router = express.Router();

/* GET users listing. */
router.patch("/pwd", controllers.password.patch);
router.get("/", controllers.userInfo.get);
router.delete("/", controllers.userInfo.delete);
router.patch("/profile", controllers.profile.patch);

module.exports = router;
