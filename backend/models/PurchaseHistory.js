import mongoose from 'mongoose';

const merchandiseSchema = new mongoose.Schema({
    merchandiseId: { type: String, required: true },
    cartQuantity: { type: Number, required: true },
    merchName: { type: String, required: true },
    merchType: { type: String, required: true },
    merchPrice: { type: Number, required: true },
    merchImage: { type: String, required: true }
  });
  
  const orderSchema = new mongoose.Schema({
    receiptVoucher: { type: String, required: true },
    discount: { type: Number, required: true },
    merchandise: [merchandiseSchema],
    totalPrice: { type: Number, required: true },
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    deliveryCharges: { type: String, required: true },
    totalPaid: { type: Number, required: true },
    deliveryStatus: { type: String, required: true }
  });
  
  const purchaseHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orders: [orderSchema]
  });

export const PurchaseHistory = mongoose.model("PurchaseHistory", purchaseHistorySchema);