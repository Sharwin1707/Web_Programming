import mongoose from "mongoose";

// Define the Voucher schema
const voucherSchema = new mongoose.Schema({
    voucherCode: { type: String, required: true, unique: true },
    voucherDisc: { type: Number, required: true },
    voucherStatus: { type: String, required: true, enum: ['active', 'non-active'], default: 'active' }
});

export const Voucher = mongoose.model("Voucher", voucherSchema);