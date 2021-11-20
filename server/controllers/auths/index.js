const { User } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login: {
    post: async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.send({ message: "require All info" });
      }
      const userInfo = await User.findOne({
        where: { email, password },
      });

      if (!userInfo) {
        res.send({ message: "invalid data" });
      } else {
        const {
          id,
          email,
          name,
          nickname,
          birth,
          mobile,
          createdAt,
          updatedAt,
        } = userInfo;
        const accessToken = jwt.sign(
          {
            id,
            email,
            name,
            nickname,
            birth,
            mobile,
            createdAt,
            updatedAt,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "30m",
          }
        );
        const verifyAccessToken = jwt.verify(
          accessToken,
          process.env.ACCESS_SECRET
        );
        delete userInfo.dataValues.password;
        const loginInfo = userInfo.dataValues;

        try {
          res.cookie("accessToken", accessToken, { httpOnly: true });
          res.cookie("tokenExpirse", verifyAccessToken.exp, { httpOnly: true });
          res.send({ data: { loginInfo }, message: "login success!" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  logout: {
    post: async (req, res) => {
      try {
        res.clearCookie("tokenExpirse");
        res.clearCookie("accessToken").send({ message: "logout success!" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  signup: {
    post: async (req, res) => {
      const { password, email, name, nickname, birth, mobile } = req.body;
      if (!password || !email || !name || !nickname || !birth || !mobile) {
        res.send({ message: "require All Info" });
      } else {
        await User.create({
          password,
          email,
          name,
          nickname,
          birth,
          mobile,
        });

        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  email: {
    post: async (req, res) => {
      const { email } = req.body;
      const getEmail = await User.findOne({
        where: { email },
      });

      if (getEmail) {
        res.send({ message: "email overlap" });
      } else {
        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  nickname: {
    post: async (req, res) => {
      const { nickname } = req.body;
      const getNickname = await User.findOne({
        where: { nickname },
      });

      if (getNickname) {
        res.send({ message: "nickname overlap" });
      } else {
        try {
          res.send({ message: "ok" });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
