const { Comment, Article } = require("../../models");

module.exports = {
  comment: {
    post: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;

      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const user_id = req.params.userId;
        const article_id = req.params.articleId;
        const message = req.body.message;

        const commentNum = await Comment.create({
          user_id,
          article_id,
          message,
        });

        const comment = await Comment.findOne({
          where: { id: commentNum.id },
        });

        const commentCnt = await Comment.count({
          where: { article_id },
        });

        await Article.update(
          {
            total_comment: commentCnt,
          },
          {
            where: {
              id: article_id,
            },
          }
        );

        try {
          res.status(201).send({ data: { comment } });
        } catch (err) {
          res.status(500).send();
        }
      }
    },
    patch: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const id = req.params.id;
        const message = req.body.message;
        const commentNum = await Comment.update(
          {
            message,
          },
          {
            where: { id },
          }
        );
        const comment_id = commentNum[0];
        const comment = await Comment.findOne({
          where: { id: comment_id },
        });
        try {
          res.send({ data: { comment } });
        } catch (err) {
          res.status(500).send();
        }
      }
    },
    delete: async (req, res) => {
      const { accessToken, tokenExpirse } = req.cookies;
      if (tokenExpirse <= Date.now() / 1000) {
        res
          .clearCookie("accessToken")
          .send({ message: "accessToken Expiration. plz Loing" });
      } else if (!accessToken) {
        res.send({ message: "not logged in" });
      } else {
        const id = req.params.id;

        const comment = await Comment.findOne({
          where: { id }
        })

        await Comment.destroy({
          where: { id },
        });

        const commentCnt = await Comment.count({
          where: { article_id: comment.article_id },
        });

        await Article.update(
          {
            total_comment: commentCnt,
          },
          {
            where: {
              id: comment.article_id,
            },
          }
        );

        try {
          res.status(204).send("deleted");
        } catch (err) {
          res.status(500).send();
        }
      }
    },
  },
};