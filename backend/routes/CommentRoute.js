import express from "express";
import { CommentModel } from "../models/Comment.js";

const router = express.Router();

// Add a new comment
router.post("/", async (req, res) => {
  try {
    const { topicId, username, reply } = req.body;

    if (!topicId || !username || !reply) {
      return res.status(400).send("Please fill in the required fields");
    }

    const newComment = new CommentModel({ topicId, username, reply });
    await newComment.save();
    return res.status(200).send("Comment added successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// Get comments for a specific post
router.get("/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const comments = await CommentModel.find({ topicId });
    return res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

export { router };
