const express = require("express");
const { likesToggle } = require("../controllers/likes_controllers");
const router = express.Router();

router.post("/toggle", likesToggle);

module.exports = router;
