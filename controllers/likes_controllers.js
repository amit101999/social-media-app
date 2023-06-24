const Likes = require("../models/likes");
const Comment = require("../models/comment");
const Post = require("../models/posts");

exports.likesToggle = async (req, res) => {
  try {
    let likeable;
    let deleted = false;
    if ((req.query.type = "Post")) {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // check if likes is already present or not
    let existingLike = await Like.finOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user,
    });

    // if like already exists
    if (existingLike) {
      // deleting from post or comment array likes field
      likeable.likes.pull(existingLike.id);
      likeable.save();

      existingLike.remove();

      deleted = true;
    } else {
      //creating new Like object
      let newLike = await new Like.create({
        user: req.user,
        likeable: req.query.id,
        onModel: req.query.types,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.status(200).json({
      message: "request success",
      deleted: deleted,
    });
  } catch (err) {
    return res.status(500).json({
      message: "error in likes ",
    });
  }
};
