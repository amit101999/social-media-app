const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./enviroment");


//tell passport to use new google auth login
passport.use(
  new googleStrategy(
    {clientID : env.google_oauth_clientID ,
     clientSecret : env.google_oauth_clientSecret ,
     callbackURL: env.google_oauth_callbackURL,
    scope: ["profile"],
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        // if we have user in db then set req.user = user
        if (user) {
          return next(null, user);
        } else {
          // if user is not in our db
          let newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            // if user not have password then we set own password
            passport: crypto.randomBytes(20).toString("hex"),
          });
          if (!newUser) {
            console.log("user not created");
            return;
          }
          return next(null, newUser);
        }
      } catch (err) {
        console.error("error in finding user : ", err);
        return;
      }
    }
  )
);

module.exports = passport;
