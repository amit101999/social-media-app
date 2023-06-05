const Post = require("../models/posts");
const User = require("../models/user");

// module.exports.home = (req, res) => {};
// or exports.home are same
exports.home = async (req, res) => {
  try {
    const posts = await Post.find()
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
