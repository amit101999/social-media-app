const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;

//DB
const db = require("./config/mongoose");

//acquiring routes
const mainroutes = require("./routes/index");

app.use(express.urlencoded());
app.use(cookieParser());

//For Static files
app.use(express.static("./assets"));

// EJS Layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// these are for making the layout accessible to our css and js files
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Routes
app.use("/", mainroutes);

// setting EJS files
app.set("view engine", "ejs");
app.set("views", "./views");

//Server configuration
app.listen(PORT, (err) => {
  if (err) {
    console.error("error : ", err);
  }
  console.log(`server started at ${PORT}`);
});
