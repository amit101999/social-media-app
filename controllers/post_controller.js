const Post = require("../models/posts");
const Comment = require("../models/comment");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating user post");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("No post found");
    }
    // .id is mongoose string id for _id from user
    if (post.user == req.user.id) {
      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      console.log("Post deleted");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in deleting Post : ", err);
  }
};
