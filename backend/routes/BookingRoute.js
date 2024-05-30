import express from "express";
import { BookingModel } from "../models/Booking.js";
import { BookingHistoryModel } from "../models/BookingHistory.js";

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
      artistId,
      artistName,
      name,
      organizationName,
      bookingDate,
      serviceRequested,
      email,
      mobileNum,
      requestDetail,
      attachment,
      status,
    } = req.body;

    if (
      !userId ||
      !artistId ||
      !artistName ||
      !name ||
      !organizationName ||
      !bookingDate ||
      !serviceRequested ||
      !email ||
      !mobileNum ||
      !requestDetail ||
      !attachment ||
      !status 
    ) {
      return res.status(400).send("Please fill in the required fields");
    }

    const newBooking = new BookingModel({
      userId,
      artistId,
      artistName,
      name,
      organizationName,
      bookingDate,
      serviceRequested,
      email,
      mobileNum,
      requestDetail,
      attachment,
      status,
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


router.get("/artistManage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BookingModel.find({ artistId: id });

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).send("No booking requests found for the given artist ID.");
    }
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    return res.status(500).send("An error occurred while fetching booking requests.");
  }
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

router.put("/response/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    if (!response) {
      return res.status(400).send('Response status is required');
    }

    const booking = await BookingModel.findByIdAndUpdate(id, { status: response }, { new: true });

    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    const history = new BookingHistoryModel({
      requestId : booking.userId,
      artistId: booking.artistId,
      artistName: booking.artistName,
      organizationName: booking.organizationName,
      bookingDate: booking.bookingDate,
      serviceRequested: booking.serviceRequested,
      email: booking.email,
      mobileNum: booking.mobileNum,
      status: response,
    });

    await history.save();
    await BookingModel.findByIdAndDelete(id);

    return res.status(200).send('Status has been updated');
  } catch (e) {
    console.error(e);
    return res.status(500).send('An error occurred while updating the status');
  }
});

export { router };
