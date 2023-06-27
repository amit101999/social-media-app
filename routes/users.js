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
  forgotPassword,
  checkEmail,
  resetPassword,
  resetUserPassword,
} = require("../controllers/user_controller");

const passport = require("passport");
const {
  addFriends,
  deleteFriends,
} = require("../controllers/friends_controller");

router.get("/profile/:id", passport.checkAuthention, profile);
router.post("/update/:id", passport.checkAuthention, updateUser);
router.get("/sign-in", signIn);
router.get("/sign-up", signUp);
router.post("/create", createUser);

router.get("/add/friend", addFriends);
router.get("/delete/friend", deleteFriends);

//here middleware is passport
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/user/sign-in",
  }),
  createSession
);

router.get("/sign-out", destroySession);

//google auth routes

// send request go google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// getting request back from google
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/sign-in" }),
  createSession
);

router.get("/forgot/password", forgotPassword);
router.post("/forgot/password/", checkEmail);
router.get("/forgot/password/reset/:id/:token", resetPassword);
router.post("/forgot/password/reset/:id/:token", resetUserPassword);

module.exports = router;
