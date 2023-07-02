const mongoose = require("mongoose");
require("dotenv").config();
const env = require('./enviroment')
const db = mongoose
  .connect(env.mongo_URL)
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log("error in connecting Db : ", err);
  });

module.exports = db;
