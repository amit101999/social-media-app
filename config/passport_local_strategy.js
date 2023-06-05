const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // mention schema user unique field
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log("invalid user name or password");
        return done(null, false);
        //done takes 2 agruments error and authentication status that to be send forward
      }
      return done(null, user);
    }
  )
);

//seriliaze the user id and store into the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

//when browser sends request to server deserilize the cookie key
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne(id);
    return done(null, user);
  } catch (err) {
    console.log("user not found ");
    return done(err);
  }
});

passport.checkAuthention = (req, res, next) => {
  //if user is sign-in or authenticated just pass to next
  if (req.isAuthenticated()) {
    return next();
  }
  //otherwise redirect
  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
