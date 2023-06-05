const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;

//session
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");

// for stroing cookies on mongoDb
const MongoStore = require("connect-mongo");

//Sass middleware
const sassMiddleware = require("node-sass-middleware");

//flash message
const flash = require("connect-flash");

const cutsomMiddleware = require("./config/middleware");

//DB
const db = require("./config/mongoose");

//acquiring routes
const mainroutes = require("./routes/index");

app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css", // where to put css files
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
app.use(express.static("./assets"));

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
    secret: "mySecrete",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    //mongo session to store cookie in db
    store: MongoStore.create(
      {
        mongoUrl: "mongodb+srv://amit:amit1999@portofolio.o3hbwpi.mongodb.net/",
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
app.listen(PORT, (err) => {
  if (err) {
    console.error("error : ", err);
  }
  console.log(`server started at ${PORT}`);
});
