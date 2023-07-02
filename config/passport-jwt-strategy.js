const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./enviroment");

const User = require("../models/user");

let options = {
  // this will extract token from the request
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(options, async (jwtPayload, next) => {
    const user = await User.findById(jwtPayload._id);
    console.log("user from jwt pasport :", user);
    if (!user) {
      console.log("error ing finding user ");
      return next(null, false);
    } else {
      return next(null, user);
    }
  })
);

module.exports = passport;
