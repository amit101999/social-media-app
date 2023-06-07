const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb+srv://amit:amit1999@social-media.dap7qon.mongodb.net/")
  .then(() => {
    console.log("mongoDb connected ");
  })
  .catch((err) => {
    console.log("error in connecting Db : ", err);
  });

module.exports = db;
