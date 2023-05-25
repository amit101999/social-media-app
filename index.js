const express = require("express");

const app = express();

const PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("error : ", err);
  }
  console.log(`server started at ${PORT}`);
});
