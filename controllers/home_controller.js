const Post = require("../models/posts");
const User = require("../models/user");

// module.exports.home = (req, res) => {};
// or exports.home are same
exports.home = async (req, res) => {
  if (!req.user) {
    return res.render("user_sign_in", {
      title: "social media",
    });
  }

  try {
    const posts = await Post.find()
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec();

    const allUser = await User.find();
    return res.render("home", {
      title: "social media",
      posts: posts,
      users: allUser,
    });
  } catch (err) {
    console.log("error in finiding posts : ", err);
  }
};
