// routes/eventRoutes.js'
import express from "express";
import { createEventModel } from "../models/createEvent.js";
import { UserModel } from "../models/User.js";
import sendReminderEmail from "../utils/email.js";


const router = express.Router();


router.post("/sendReminder", async (req, res) => {
  try {
    const { userId, userEmail,username, eventId, concertName , eventDate,eventTime,eventLocation  } = req.body;

    
    // Send the reminder email
    sendReminderEmail(userEmail, concertName, eventDate, username,eventTime,eventLocation );

    res.status(200).json({ message: 'Reminder email sent' });
  } catch (error) {
    console.error('Error sending reminder email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export {router};
