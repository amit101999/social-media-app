const express = require("express");
const router = express.Router();
const { profile, signIn, signUp } = require("../controllers/user_controller");

router.get("/profile", profile);
router.get("/sign-in", signIn);
router.get("/sign-up", signUp);

module.exports = router;
