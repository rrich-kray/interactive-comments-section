const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const { signToken } = require("../utils/auth");

router.get("/interactive-comments-section/api/comments", async (req, res) => {
  await Comment.findAll({
    include: [{ all: true, nested: true }],
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/interactive-comments-section/api/users", async (req, res) => {
  await User.findAll({})
    .then((response) => res.json(response))
    .catch((error) => res.json(error.message));
});

router.post("/interactive-comments-section/api/comments", async (req, res) => {
  await Comment.create(req.body)
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.post("/interactive-comments-section/api/login", async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then((userData) => {
      const token = signToken(userData);
      res.json(token);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/interactive-comments-section/api/register", async (req, res) => {
  await User.create(req.body)
    .then((userData) => {
      const token = signToken(userData);
      res.json(token); // assumes no hiccups sending token as json in response. Can then use this token and userData with context on front end per usual
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
