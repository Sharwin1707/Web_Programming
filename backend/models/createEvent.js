import mongoose from "mongoose";

const createEventSchema = new mongoose.Schema({
    ArtistName: {
      type: String,
      required: true,
    },
    concertName: {
      type: String,
      required: true,
    },
    eventDetail: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Base64 encoded string
      required: false,
    },
  });
  
  export const createEventModel = mongoose.model("createEvent", createEventSchema);