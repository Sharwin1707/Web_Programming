import express from 'express';
import { BookingModel } from '../models/Booking.js';

const router = express.Router();

// create new booking request
router.post('/', async (req, res) => {
    try{
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
            attachment
        } = req.body;

        if(!userId || !artistName || !name || !organizationName || !bookingDate || !serviceRequested || !email || !mobileNum || !requestDetail || !attachment){
            return res.status(400).send('Please fill in the required fields')
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
            attachment
        })
        await newBooking.save()
        return res.status(200).send('Booking saved successfully')
    }catch(e){
        console.log(e)
    }
})

export {router}