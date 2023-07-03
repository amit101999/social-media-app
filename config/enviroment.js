require("dotenv").config();
const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')

const logDirectory = path.join(__dirname , "../productions_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log', {
  interval: "1d",
  path : logDirectory
})

const development = {
  name: "development",
  assest_path: "./assets",
  session_cookie_secrete_key: "SessionCookieKey",
  mongo_URL:
    'mongodb+srv://amit:amit1999@social-media-app.leh27va.mongodb.net/',
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "amitthakur10sep@gmail.com", // generated ethereal user
      pass: "vwkybrzlnwuupece", // generated ethereal password
    },
  },
  google_oauth_clientID:"71661617344-q0jo5d0btaq2rok8kcheja7o4j5minmv.apps.googleusercontent.com",
  google_oauth_clientSecret: "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",
  google_oauth_callbackURL: "http://localhost:4000/user/auth/google/callback",
  jwt_secret : "MyJWTSecret",
  morgan :{
    mode  : "dev",
    options :{
      stream :accessLogStream
    }
  }
};

const production = {
  name: "production",
  assest_path: process.env.ASSET_PATH,
  session_cookie_secrete_key: process.env.SESSION_COOKIE_SECRET,
  mongo_URL:
    process.env.MONGO_URL,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  },
  google_oauth_clientID:process.env.GOOGLE_oAUTH_CLIENTID,
  google_oauth_clientSecret: process.env.GOOGLE_oAUTH_CLIENTSECRET,
  google_oauth_callbackURL: process.env.GOOGLE_oAUTH_CALLBACKURL,
  jwt_secret : process.env.JWT_SCERET,
  morgan :{
    mode  : "combined",
    options :{
      stream :accessLogStream
    }
  }
};

module.exports = eval(process.env.DEVELOPMENT_ENV_NAME == undefined ? development : eval(process.env.DEVELOPMENT_ENV_NAME));
// module.exports = development