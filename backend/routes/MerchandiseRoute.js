import express from "express";
import { MerchandiseModel } from "../models/Merchandise.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const router = express.Router();

// Retrieve all merchandise
router.get("/", async (req, res) => {
  try {
    const allMerchandiseData = await MerchandiseModel.find();
    if (!allMerchandiseData) {
      return res.send("Merchandise Data is empty");
    }
    return res.status(200).send(allMerchandiseData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

//retrieve merchandise based on merchant
router.get("/:merchantId", async (req, res) => {
  try {
    const { merchantId } = req.params;
    const result = await MerchandiseModel.find({merchantId})

    if(result){
      return res.status(200).send(result);
    }

    return res.status(404).send("Not Found");
  } catch (err) {}
});

// Create new merchandise
router.post("/", async (req, res) => {
  try {
    const {
      merchantId,
      price,
      rating,
      description,
      quantity,
      type,
      tag,
      image,
      name,
    } = req.body;
    if (
      !merchantId ||
      !price ||
      !rating ||
      !description ||
      !quantity ||
      !type ||
      !tag ||
      !image ||
      !name
    ) {
      return res.status(400).send("Please enter the required fields");
    }
    const newMerchandise = new MerchandiseModel({
      merchantId,
      price,
      rating,
      description,
      quantity,
      type,
      tag,
      image,
      name,
    });
    await newMerchandise.save();
    return res
      .status(200)
      .send("Merchandise created successfully: " + newMerchandise);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Find merchandise by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findMerchandiseData = await MerchandiseModel.findById(id);
    if (!findMerchandiseData) {
      return res.send("Merchandise does not exist");
    }
    return res.status(200).send(findMerchandiseData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Update merchandise data
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedData = await MerchandiseModel.findOneAndUpdate(
      { _id: id }, // Query to find the document by its id
      updateData, // Data to update
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send("Merchandise not found");
    }

    return res.status(200).send("Data updated successfully: " + updatedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete merchandise data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await MerchandiseModel.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).send("Merchandise not found");
    }

    return res
      .status(200)
      .send("Merchandise deleted successfully: " + deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

export { router };
