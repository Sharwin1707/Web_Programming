import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
});

const gallerySchema = new mongoose.Schema({
  artistId: {
    type: String,
    required: true,
  },
  images: [imageSchema],
});

export const GalleryModel = mongoose.model('Gallery', gallerySchema);
