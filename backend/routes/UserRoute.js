import express from "express";
import { UserModel } from "../models/User.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()

const router = express.Router();


// retrieve all users
router.get("/", async (req, res) => {
  try {
    const allUserData = await UserModel.find();
    if (!allUserData) {
      return res.send("User Data is empty");
    }
    return res.status(200).send(allUserData);
  } catch (err) {
    console.log(err);
  }
});

// create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;
    if (!username || !email || !password || !userType) {
      return res.status(400).send("Please enter the required fields");
    }
    const registerUser = new UserModel({ username, email, password, userType });
    await registerUser.save();
    return res.status(200).send("Registration successful : " + registerUser);
  } catch (err) {
    console.log(err);
  }
});

//find user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findUserData = await UserModel.findById(id);
    if (!findUserData) {
      return res.send("User does not exist");
    }
    return res.status(200).send(findUserData);
  } catch (err) {
    console.log(err);
  }
});

//update user data
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedData = await UserModel.findOneAndUpdate(
      { _id: id }, // Query to find the document by its id
      updateData, // Data to update
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send("Data updated successfully: " + updatedData);
  } catch (err) {
    console.log(err);
  }
});

//delete user data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await UserModel.findByIdAndDelete(id);

    if (!updatedData) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send("User deleted successfully: " + updatedData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try{
    const {username,password,userType} = req.body;
    const user = await UserModel.findOne({username : username})
    if(user){
      if(user.password === password){    
        if(user.userType === userType) {
          return res.status(200).send({user : user});
        }
        return res.status(403).send('User type is not authorized')
      }
      else{
        return res.status(403).send('Password incorrect')
      }
    }
    else{
      return res.status(402).send("User does not exist")
    }

  }catch(e){

  }
})









export { router };