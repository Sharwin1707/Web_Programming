import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
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
});

export const PostModel = mongoose.model("post",PostSchema)