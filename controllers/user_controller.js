// module.exports.function name is same as exports.function

const User = require("../models/user");

module.exports.profile = async (req, res) => {
  try {
    if (req.cookies.user_id) {
      const user = await User.findOne({ _id: req.cookies.user_id });
      if (!user) {
        console.log("user id cookies is wrong");
        return res.redirect("/user/sign-in");
      }
      console.log("user found : ", user);
      return res.render("user_profile");
    } else {
      console.log("no cookie present that is user is not logged in");
      return res.redirect("/user/sign-in");
    }
  } catch (err) {
    console.log("error in loading profile page : ", err);
  }
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
    console.log("user already exists with current email");
    return res.redirect("back");
  }
  const user = await User.create(req.body);
  console.log("user created");
  return res.redirect("/user/sign-in");
};

exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // checking if user is present with email  or not
      console.log("user not found");
      return res.redirect("back");
    }
    if (user) {
      //if user is present with email
      if (req.body.password !== user.password) {
        // checking password
        console.log("password is inCorrect");
        return res.redirect("back");
      }
      console.log("user found and password is Correct");
      res.cookie("user_id", user._id); // cstroing user id as cookie
      return res.redirect("/user/profile");
    }
  } catch (err) {
    console.log("error in finding user : ", err);
  }
};
