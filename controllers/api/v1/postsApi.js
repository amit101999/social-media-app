const Post = require("../../../models/posts");

exports.index = (req, res) => {
  return res.json(200, {
    data: "my data",
    posts: [],
  });
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // if (!post) {
    //   console.log("No post found");
    // }
    // .id is mongoose string id for _id from user
    if (post.user == req.user.id) {
      await post.deleteOne();
      // await Comment.deleteMany({ post: req.params.id });
      return res.status(200).json({ message: "post deleted" });
    } else {
      return res
        .status(401)
        .json({ message: "unautohrized person u cant delte this post" });
    }
  } catch (err) {
    console.log("error in deleting Post : ", err);
  }
};
