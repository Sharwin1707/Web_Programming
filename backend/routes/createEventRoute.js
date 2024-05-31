import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { createEventModel } from "../models/createEvent.js";
import multer from 'multer';
dotenv.config()

const router = express.Router();
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });


/*************** Create an event ************************/
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Received request to create event'); // Log for debugging
  try {
    const { ArtistName, concertName, eventDetail, venue, date, start, end } = req.body;
    const image = req.file ? req.file.buffer.toString('base64') : undefined; // Convert file to base64

   // if (!image) {
  //    return res.status(400).json({ error: 'Image is required' });
    //}

    await createEventModel.create({ ArtistName, concertName, eventDetail, venue, date, start, end, image });

    res.status(200).json({ msg: 'Event created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

/*************** Get all event **************************/
router.get('/', async(req, res) => {
    try {
      const event = await createEventModel.find();
      res.status(200).json({event});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/*************** Delete Post **************************/
router.delete('/:id', async (req, res) => {
    // Check the ID is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Incorrect ID" });
    }
  
    // Check the post exists
    const event = await createEventModel.findById(req.params.id);
    if (!event) {
      return res.status(400).json({ error: "event not found" });
    }
  
   
  
    try {
      await event.deleteOne();
      res.status(200).json({ success: "event was deleted." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
/************** Update event **************************/
  router.put('/:id', upload.single('image'), async (req, res) => {
    const { ArtistName, concertName, eventDetail, venue, date, start, end } = req.body;

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Incorrect ID"});
    }

    // Check if the event exists
    const event = await createEventModel.findById(req.params.id);
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    try {
        // Update event fields
        event.ArtistName = ArtistName;
        event.concertName = concertName;
        event.eventDetail = eventDetail;
        event.venue = venue;
        event.date = date;
        event.start = start;
        event.end = end;

        // Update image if a new file is uploaded
        if (req.file) {
            event.image = req.file.buffer.toString('base64');
        }

        // Save the updated event document
        await event.save();

        res.status(200).json({ msg: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
});


export { router };


