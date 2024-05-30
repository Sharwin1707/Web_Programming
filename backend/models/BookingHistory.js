import mongoose from "mongoose";

const bookingHistoryScheme = mongoose.Schema({
  requestId: {
    type: String,
    required: true,
  },
  artistId: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  serviceRequested: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  status : {
    type: String,
    required: true,
  }
});

export const BookingHistoryModel = mongoose.model("BookingHistory", bookingHistoryScheme);