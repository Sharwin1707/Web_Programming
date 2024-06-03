import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "postAt", updatedAt: false },
  }
);

export const PostModel = mongoose.model("post", PostSchema);
