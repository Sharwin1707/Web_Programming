import express from "express";
import { GalleryModel } from "../models/ArtistGallery.js";

const router = express.Router();


router.post('/upload', async (req, res) => {
    try {
        const { artistId, imageUrl } = req.body;

        // Find the gallery by artistId
        let gallery = await GalleryModel.findOne({ artistId });

        if (gallery) {
            // If the gallery exists, add the new image to the images array
            gallery.images.push({ imageUrl });
            await gallery.save();
            res.status(200).json({ message: "Image added to existing gallery", gallery });
        } else {
            // If the gallery doesn't exist, create a new one
            const images = [{ imageUrl }];
            gallery = new GalleryModel({ artistId, images });
            await gallery.save();
            res.status(201).json({ message: "Gallery created successfully", gallery });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gallery creation or update failed", error: err });
    }
});


router.get('/images/:artistId', async (req, res) => {
    try {
        const { artistId } = req.params;

        // Find all galleries for the given artistId
        const galleries = await GalleryModel.find({ artistId });

        if (!galleries.length) {
            return res.status(404).json({ message: "No galleries found for the given artist ID" });
        }

        // Extract all images from the galleries
        const images = galleries.flatMap(gallery => gallery.images);

        res.status(200).json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch images", error: err });
    }
});

export { router };
