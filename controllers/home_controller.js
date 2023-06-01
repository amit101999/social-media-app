const Post = require("../models/posts");

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
    return res.render("home", {
      title: "social media",
      posts: posts,
    });
  } catch (err) {
    console.log("error in finiding posts : ", err);
  }
};
