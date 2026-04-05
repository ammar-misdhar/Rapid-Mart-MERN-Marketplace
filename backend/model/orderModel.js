import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true },
    trackingNo: { type: String },
    address: { type: String },
    sellerNote: { type: String }
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);
export default orderModel;