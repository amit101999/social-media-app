const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose
  .connect("mongodb+srv://amit:amit1999@social-media-app.leh27va.mongodb.net/")
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log("error in connecting Db : ", err);
  });

module.exports = db;
