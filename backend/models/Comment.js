import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'PostForum', required: true },
    username: { type: String, required: true },
    reply: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const CommentModel = mongoose.model("Comment", commentSchema);

