const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home_controller.js");
const userRouter = require("./users.js");

// middleware that is specific to this router
router.get("/", home);
router.use("/user", userRouter);

module.exports = router;
