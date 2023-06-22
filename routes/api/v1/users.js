const express = require("express");
const { createSession } = require("../../../controllers/api/v1/userApi");
const router = express.Router();

router.post("/create-session", createSession);

module.exports = router;
