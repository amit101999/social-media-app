const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Like", likesSchema);
