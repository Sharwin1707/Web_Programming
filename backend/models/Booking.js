import mongoose from "mongoose";

const bookingScheme = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  name: {
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
  requestDetail: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
});

export const BookingModel = mongoose.model("Booking", bookingScheme);
