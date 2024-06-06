import express from "express";
import { Voucher } from "../models/Voucher.js"; // Ensure the import matches the export in Payment.js
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// API endpoint to fetch voucher details
router.post('/redeem-voucher', async (req, res) => {
    const { voucherCode } = req.body;

    try {
        const voucher = await Voucher.findOne({ voucherCode, voucherStatus: 'active' });
        if (!voucher) {
            return res.status(404).send('Voucher not found or inactive');
        }
        res.json({ voucherDisc: voucher.voucherDisc });
    } catch (error) {
        res.status(500).send(error);
    }
});

// API endpoint to add a new voucher
router.post('/add-voucher', async (req, res) => {
    const { voucherCode, voucherDisc, voucherStatus } = req.body;

    try {
        const newVoucher = new Voucher({
            voucherCode,
            voucherDisc,
            voucherStatus
        });

        await newVoucher.save();
        res.status(201).send('Voucher added successfully');
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).send('Voucher code must be unique');
        } else {
            res.status(500).send(error);
        }
    }
});


export { router };// Ensure you export the router correctly
