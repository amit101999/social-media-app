const express = require("express");
const { index, deletePost } = require("../../../controllers/api/v1/postsApi");
const router = express.Router();
const passport = require("passport");

router.get("/", index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

module.exports = router;
