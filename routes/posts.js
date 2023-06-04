const express = require("express");
const { createPost, deletePost } = require("../controllers/post_controller");
const passport = require("passport");
const router = express.Router();

router.post("/create", passport.checkAuthention, createPost);
router.get("/delete/:id", passport.checkAuthention, deletePost);

module.exports = router;
