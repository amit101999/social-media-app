const express = require("express");
const passport = require("passport");
const { createComment } = require("../controllers/comments_controller");
const router = express.Router();

router.post("/create", passport.checkAuthention, createComment);

module.exports = router;
