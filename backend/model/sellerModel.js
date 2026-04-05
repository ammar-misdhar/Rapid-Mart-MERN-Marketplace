import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true }
},{ timestamps: true })

const sellerModel= mongoose.model('seller',sellerSchema);
export default sellerModel;