// module.exports.function name is same as exports.function

const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/nodemailer");
const env = require("../config/enviroment");

module.exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("no user find");
      return res.redirect("back");
    }
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (err) {
    console.log("error in finding user : ", err);
  }
};

//update User
exports.updateUser = async (req, res) => {
  // checking if current user is the one who is updating its form not by someone else
  try {
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id);
      // before multer we can read body but after multer we cant read body directly
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("error in uplaoding image:", err);
        }
        //updating profile
        user.name = req.body.name;
        user.email = req.body.email;

        //checking if file field have some value
        if (req.file) {
          //checking if user have avatar and that avatar is already exsist  or not
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            // delete if user have already avatar
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          // saving path of the avatar
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
      });
      console.log("user :  ", user);
      return res.redirect("back");
    } else {
      console.log("u can only updated ur user profile");
      return res.status(401).send("unauthorized");
    }
  } catch (err) {
    console.log("error in updating user :", err);
    return res.redirect("back");
  }
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
  //created flash message

  req.flash("success", "LoggedIn Successfully");

  return res.redirect("/");
};

exports.destroySession = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("error  int logout : ", err);
      next(err);
    }
  });
  req.flash("success", "Loggout  Successfully");
  //created flash message
  return res.redirect("/");
};

//forgot password

exports.forgotPassword = (req, res) => {
  return res.render("check_email", {});
};

exports.checkEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, env.jwt_secret, { expiresIn: "10m" });

      //sending reset link to email
      const link = `http://localhost:4000/user/forgot/password/reset/${user._id}/${token}`;
      await transporter.sendMail(
        {
          from: "amitthakur10sep@gmail.com", // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Pasword reset link", // Subject line
          html: `<a href=${link} >Click here to reset password</a>`, // html body
        },
        (err) => {
          if ((err, info)) {
            console.log("error in sending mail : ", err);
            return;
          }
          console.log("mail send", info);
          return;
        }
      );

      return res.send(`passport reset link has been send to ur email`);
    }
    return res.send("user not found with given email address");
  } catch (err) {
    console.log("error : ", err);
    return res.send("user not found with given email address");
  }
};

exports.resetPassword = (req, res) => {
  const { token, id } = req.params;
  try {
    //verifying token
    const payload = jwt.verify(token, env.jwt_secret);
    return res.render("forgot_password");
  } catch (err) {
    return res.send("link expired!!! try again");
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const { token, id } = req.params;
    const { password, confirmPassword } = req.body;
    //verifying token
    const payload = jwt.verify(token, env.jwt_secret);
    if (password === confirmPassword) {
      await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            password: password,
          },
        }
      );
      return res.redirect("/");
      jwt.sign("", "AMIT", { expiresIn: "0" });
    } else {
      return res.send("password and confirmPassword doesnt match try again");
    }
  } catch (err) {
    return res.send("link expired!!! try again from reset password function");
  }
};
