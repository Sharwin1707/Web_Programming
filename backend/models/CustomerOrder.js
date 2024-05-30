import mongoose from "mongoose";

const merchandiseOrderSchema = new mongoose.Schema({
    merchandiseId: String,
    quantity: Number,
    status: String,
  });
  
  const customerOrderSchema = new mongoose.Schema({
    _id: String,
    orderDate: Date,
    customerFirstName: String,
    customerLastName: String,
    customerAddress: String,
    merchandiseOrders: [merchandiseOrderSchema],
  });
  
  export const CustomerOrderModel = mongoose.model("CustomerOrder", customerOrderSchema);
  