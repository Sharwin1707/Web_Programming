import express from "express";
import {PostModel} from "../models/PostForum.js";

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await PostModel.find();
      return res.send(posts);
    } catch (e) {
      console.log(e);
    }
  });

  //get by id
  router.get('/:id', async (req, res) => {
    try {
      const {id} = req.params
      const post = await PostModel.findById(id);
      return res.status(200).send(post);
    } catch (e) {
      console.log(e);
    }
  });  

// Create a new post
router.post('/', async (req, res) => {
    try {
        const{userId, username, title, content} = req.body;

        if(!userId || !username || !title || !content ){
            return res.status(400).send("Please fill in the required fields");
        }

        const newPost = new PostModel({userId, username, title, content,
        });

        await newPost.save();
        return res.status(200).send("New Post saved successfully");

    } catch (error) {
        console.log(error);
    }
  });

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await PostModel.findByIdAndDelete(id);

    if (!deletePost) {
      return res.status(404).send("Posting not found");
    }

    return res.status(200).send("Post deleted successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server error");
  }

});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).send("Please fill in the required fields");
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    return res.status(200).send("Post updated successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server error");
  }
});

export {router};

