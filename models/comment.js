const mongoose = require("mongoose");

const commnetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // for user refernec
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commnetSchema);
