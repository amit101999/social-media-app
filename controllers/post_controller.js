const Post = require("../models/posts");
const Comment = require("../models/comment");
const Like = require("../models/likes");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created!!",
      });
    }

    return res.redirect("back");
  } catch (err) {
    console.log("error in creating user post");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("No post found :", req.params);
    }
    // .id is mongoose string id for _id from user
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });

      await post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted",
        });
      }

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in deleting Post : ", err);
  }
};
