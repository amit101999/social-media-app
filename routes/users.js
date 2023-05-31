const express = require("express");
const router = express.Router();
const {
  profile,
  signIn,
  signUp,
  createUser,
} = require("../controllers/user_controller");

router.get("/profile", profile);
router.get("/sign-in", signIn);
router.get("/sign-up", signUp);
router.post("/create", createUser);

module.exports = router;
