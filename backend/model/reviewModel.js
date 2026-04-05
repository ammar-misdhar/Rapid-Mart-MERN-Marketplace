import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productID: { type: mongoose.Types.ObjectId, required: true },
    customerID: { type: mongoose.Types.ObjectId, ref: 'customer', required: true },
    sellerID: { type: mongoose.Types.ObjectId, ref: 'seller', required: true },
    customerReview: { type: String, required: true },
    sellerReplay: { type: String }
}, { timestamps: true })

const reviewModel = mongoose.model('review', reviewSchema);

export default reviewModel;