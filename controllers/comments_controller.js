const comment = require("../models/comment");
const Comment = require("../models/comment");
const Post = require("../models/posts");

exports.createComment = async (req, res) => {
  try {
    const Userpost = await Post.findById(req.body.post);

    if (Userpost) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      console.log(comment);
      if (!comment) {
        console.log("error in posting commnet ");
        res.redirect("/");
      }

      await Userpost.comments.push(comment);
      await Userpost.save();
      console.log("comment done : ", Userpost);
      res.redirect("/");
    }
  } catch (err) {
    console.log("cant find post from comment using id : ", err);
    res.redirect("/");
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      console.log("No comment found");
    }
    // .id is mongoose string id for _id from user
    if (comment.user == req.user.id) {
      let postId = comment.post;
      await comment.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      return res.redirect("back");
    }
    console.log("error in delete comment : ");
    return res.redirect("back");
  } catch (err) {
    console.log("error in deleting Comment : ", err);
  }
};
