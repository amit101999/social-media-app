const express = require("express");
const router = express.Router();
const {
  profile,
  signIn,
  signUp,
  createUser,
  createSession,
} = require("../controllers/user_controller");

router.get("/profile", profile);
router.get("/sign-in", signIn);
router.get("/sign-up", signUp);
router.post("/create", createUser);
router.post("/create-session", createSession);

module.exports = router;
