import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productStock: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    image: { type: String },
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'seller', required: true }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

export default productModel;