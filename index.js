const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
const PORT = 8000;
const path = require('path')
require("dotenv").config();
app.use(cors());
//DB
const db = require("./config/mongoose");

//all developemnet and productions keys are here
const env= require("./config/enviroment") 

//session
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-Oauth2-Strategy");

// for stroing cookies on mongoDb
const MongoStore = require("connect-mongo");

//Sass middleware
const sassMiddleware = require("node-sass-middleware");

//flash message
const flash = require("connect-flash");

const cutsomMiddleware = require("./config/middleware");

// sockets
const chatServer = require("http").Server(app);
const chatSocket = require("./config/chat_sockets").chatSocket(chatServer);
chatServer.listen(5000);
console.log("chat server started");

//acquiring routes
const mainroutes = require("./routes/index");

app.use(
  sassMiddleware({
    /* Options */
    // this  will make add current path with assests/scss
    src: path.join(__dirname , env.assest_path,'/scss'),
    dest: path.join(__dirname , env.assest_path,'/css'), // where to put css files
    debug: true,
    outputStyle: "extended",
    prefix: "/css", // Where prefix to look for css files
  })
);

//for corverting upcoming request data to readable data
app.use(express.urlencoded());

// for cookies
app.use(cookieParser());

//For Static files
app.use(express.static(env.assest_path));
//make the uploads path availabel to the browser
app.use("/upload", express.static(__dirname + "/upload"));

// EJS Layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

// these are for making the layout accessible to our css and js files
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting EJS files
app.set("view engine", "ejs");
app.set("views", "./views");

// for encrptying session cookie
app.use(
  session({
    name: "social_app",
    // change secret beofore depolyment in production
    secret: env.session_cookie_secrete_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //mongo session to store cookie in db
    store: MongoStore.create(
      {
        mongoUrl:
          "mongodb+srv://amit:amit1999@social-media-app.leh27va.mongodb.net/",
        autoRemove: "disabled",
      },
      (err) => {
        console.log("error in mongo connect");
      }
    ),
  })
);

//intialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// setting current user to req.user
app.use(passport.setAuthenticatedUser);

//put after session is initalize since this uses session
app.use(flash());
app.use(cutsomMiddleware.setFlash);

//Routes
app.use("/", mainroutes);

//Server configuration
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error("error  in server connection: ", err);
  }
  console.log(`server started at ${process.env.PORT}`);
});
