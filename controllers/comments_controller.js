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
