const { User } = require("../../models");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  password: {
    patch: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      console.log(accessToken);

      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .clearCookie("tokenExpirse")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (accessToken) {
        const newPassword = req.body.password;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const loginInfo = await User.findOne({
          where: { id: userInfo.id },
        });
        const curPassword = loginInfo.password;

        if (newPassword) {
          await User.update(
            { password: newPassword },
            {
              where: { password: curPassword },
            }
          );

          try {
            res.send({ message: "success change password" });
          } catch (err) {
            console.log(err);
          }
        } else {
          res.send({ message: "need new password" });
        }
      } else {
        res.send({ message: "not logged in" });
      }
    },
  },
  userInfo: {
    get: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      // accessToken 만료 여부 체크
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .clearCookie("tokenExpirse")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (accessToken) {
        const userInfo = await jwt.verify(
          accessToken,
          process.env.ACCESS_SECRET
        );
        try {
          res.send({ data: { userInfo }, message: "present Userinfo" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.send({ message: "not logged in" });
      }
    },
    delete: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;

      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .clearCookie("tokenExpirse")
          .status(401)
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (accessToken) {
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const { id, email } = userInfo;

        await User.destroy({
          where: { id, email },
        });
        try {
          res.clearCookie("tokenExpirse");
          res.clearCookie("accessToken");
          res.send({ message: "success delete userInfo" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.send({ mesasge: "not logged in" });
      }
    },
  },
  profile: {
    patch: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      console.log(req.cookies);

      // if (tokenExpirse <= Date.now() / 1000) {
      //   res
      //     .clearCookie("accessToken")
      //     .clearCookie("tokenExpirse")
      //     .status(401)
      //     .send({ message: "accessToken Expiration. plz Loing" });
      // }
      if (accessToken) {
        const newImage = req.body.image;
        const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const loginInfo = await User.findOne({
          where: { id: userInfo.id },
        });
        const curImage = loginInfo.image;

        if (newImage) {
          await User.update(
            { image: newImage },
            {
              where: { image: curImage, id: userInfo.id },
            }
          );

          try {
            return res.send({
              data: { img: loginInfo.image },
              message: "success change image",
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          res.send({ message: "need image url" });
        }
      } else {
        res.send({ message: "not logged in" });
      }
    },
  },
};
