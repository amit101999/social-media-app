// module.exports.function name is same as exports.function

const User = require("../models/user");

module.exports.profile = (req, res) => {
  return res.render("user_profile");
};

//render singUp page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up");
};

//render singIn page
exports.signIn = async (req, res) => {
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
  return res.send("session created");
};
