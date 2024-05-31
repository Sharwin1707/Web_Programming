import express from "express";
import { BookingHistoryModel } from "../models/BookingHistory.js";

const router = express.Router();

// Fetch the booking history for the given artist ID
router.get("/:id", async (req, res) => {
    try {
      const { id: artistId } = req.params;
      
      // Fetch the booking history for the given artist ID
      const bookingHistory = await BookingHistoryModel.find({ artistId });
  
      if (bookingHistory.length === 0) {
        return res.status(404).send("No booking history found");
      }
  
      return res.status(200).json(bookingHistory);
    } catch (e) {
      console.error(e);
      return res.status(500).send("An error occurred while retrieving booking history");
    }
  });

export { router };
