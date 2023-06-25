const Comment = require("../models/comment");
const Post = require("../models/posts");
const Like = require("../models/likes");
// const { newComment } = require("../mailers/comments_mailer");
const commnetEmailMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commnetEmailWorker = require("../workers/comment_email");

exports.createComment = async (req, res) => {
  try {
    const Userpost = await Post.findById(req.body.post);

    if (Userpost) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      await Userpost.comments.push(comment);
      await Userpost.save();
      comment = await comment.populate("user");
      // newComment(comment);  if we dont use redis and worker
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("error in sending comment to the queue : " + err);
        }
        console.log("new job created : " + job.id);
      });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Created",
        });
      }

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

      // deleting likes related to comment comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      // deleting comment
      await comment.deleteOne();

      //removing from comment ID from Post Array
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment delted",
        });
      }
      return res.redirect("back");
    }
    console.log("error in delete comment : ");
    return res.redirect("back");
  } catch (err) {
    console.log("error in deleting Comment : ", err);
  }
};
