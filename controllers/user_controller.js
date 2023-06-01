// module.exports.function name is same as exports.function

const User = require("../models/user");

module.exports.profile = (req, res) => {
  return res.render("user_profile");
};

//render singUp page
module.exports.signUp = (req, res) => {
  //isAuthenticated is a function which have user state that is its sign in or not
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_up");
};

//render singIn page
exports.signIn = async (req, res) => {
  //isAuthenticated is a function which have user state that is its sign in or not
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("user_sign_in");
};

//creating user
exports.createUser = async (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    console.log("password not matched");
    return res.redirect("back");
  }

  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    // checking email is already present or not
    console.log("user already exists with email");
    return res.redirect("back");
  }
  const user = await User.create(req.body);
  console.log("user created");
  return res.redirect("/user/sign-in");
};

exports.createSession = async (req, res) => {
  return res.redirect("/");
};

exports.destroySession = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("error  int logout : ", err);
      next(err);
    }
  });
  return res.redirect("/");
};