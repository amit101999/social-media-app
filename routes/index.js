const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home_controller.js");
const userRouter = require("./users.js");
const postRouter = require("./posts.js");
const commentRouter = require("./comments.js");
const LikesRouter = require("./likes");

// middleware that is specific to this router
router.get("/", home);
router.use("/user", userRouter);
router.use("/posts", postRouter);
router.use("/comment", commentRouter);
router.use("/likes", LikesRouter);

router.use("/api", require("./api"));

module.exports = router;
