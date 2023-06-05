const express = require("express");
const router = express.Router();
const {
  profile,
  signIn,
  signUp,
  createUser,
  createSession,
  destroySession,
  updateUser,
} = require("../controllers/user_controller");

const passport = require("passport");

router.get("/profile/:id", passport.checkAuthention, profile);
router.post("/update/:id", passport.checkAuthention, updateUser);
router.get("/sign-in", signIn);
router.get("/sign-up", signUp);
router.post("/create", createUser);

//here middleware is passport
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/user/sign-in",
  }),
  createSession
);

router.get("/sign-out", destroySession);

module.exports = router;
