import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
},{ timestamps: true });

const customerModel = mongoose.model('customer', customerSchema);
export default customerModel;