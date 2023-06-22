const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use new google auth login
passport.use(
  new googleStrategy(
    {
      clientID:
        "71661617344-q0jo5d0btaq2rok8kcheja7o4j5minmv.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/user/auth/google/callback",
      scope: ["profile"],
    },
    async (accessToken, refreshToken, profile, next) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        // if we have user in db then set req.user = user
        if (user) {
          console.log(profile);
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
