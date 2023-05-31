const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb+srv://amit:amit1999@portofolio.o3hbwpi.mongodb.net/")
  .then(() => {
    console.log("mongoDb connected ");
  })
  .catch((err) => {
    console.log("error in connecting Db : ", err);
  });

module.exports = db;
