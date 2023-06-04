const express = require("express");
const passport = require("passport");
const {
  createComment,
  deleteComment,
} = require("../controllers/comments_controller");
const router = express.Router();

router.post("/create", passport.checkAuthention, createComment);
router.get("/delete/:id", passport.checkAuthention, deleteComment);

module.exports = router;
