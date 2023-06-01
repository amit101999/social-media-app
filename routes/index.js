const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home_controller.js");
const userRouter = require("./users.js");
const postRouter = require("./posts.js");
const commentRouter = require("./comments.js");

// middleware that is specific to this router
router.get("/", home);
router.use("/user", userRouter);
router.use("/posts", postRouter);
router.use("/comment", commentRouter);

module.exports = router;
