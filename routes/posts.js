const express = require("express");
const { createPost } = require("../controllers/post_controller");
const passport = require("passport");
const router = express.Router();

router.post("/create", passport.checkAuthention, createPost);

module.exports = router;
