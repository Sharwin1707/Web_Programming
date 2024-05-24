import express from "express";
import { BookingModel } from "../models/Booking.js";

const router = express.Router();

//get all booking
router.get("/", async (req, res) => {
  try {
    const bookingData = await BookingModel.find();
    return res.send(bookingData);
  } catch (e) {
    console.log(e);
  }
});

// create new booking request
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      artistName,
      name,
      organizationName,
      bookingDate,
      serviceRequested,
      email,
      mobileNum,
      requestDetail,
      attachment,
    } = req.body;

    if (
      !userId ||
      !artistName ||
      !name ||
      !organizationName ||
      !bookingDate ||
      !serviceRequested ||
      !email ||
      !mobileNum ||
      !requestDetail ||
      !attachment
    ) {
      return res.status(400).send("Please fill in the required fields");
    }

    const newBooking = new BookingModel({
      userId,
      artistName,
      name,
      organizationName,
      bookingDate,
      serviceRequested,
      email,
      mobileNum,
      requestDetail,
      attachment,
    });
    await newBooking.save();
    return res.status(200).send("Booking saved successfully");
  } catch (e) {
    console.log(e);
  }
});

router.post("/find", async (req, res) => {
  try {
    const uid = req.body.uid;
    const data = await BookingModel.find({ userId: uid });
    if (data) {
      return res.status(200).send(data);
    }
    return res.status(400).send("There is no booking request");
  } catch (e) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBooking = await BookingModel.findByIdAndDelete(id);

    if (!deleteBooking) {
      return res.status(404).send("Booking not found");
    }
  } catch (e) {
    console.log(e);
  }
});

export { router };
