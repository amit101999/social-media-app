const Post = require("../models/posts");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    console.log("created : ", post);
  } catch (err) {
    console.log("error in creating user post");
  }
  return res.redirect("back");
};
