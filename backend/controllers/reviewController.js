import orderModel from "../model/orderModel.js";
import productModel from "../model/productMoodel.js";
import reviewModel from "../model/reviewModel.js";

const postReview = async (req, res) => {
    const customerID = req.user.id;
    const { productID, customerReview } = req.body;

    const seller = await productModel.findById(productID).select('sellerID')

    if (!seller) return res.status(404).json({ message: "can't find seller" });

    try {
        const newReview = new reviewModel({ productID, customerID, sellerID: seller.sellerID, customerReview, sellerReplay: "" });
        await newReview.save();
        res.status(200).json(newReview);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }

}

const getCustomerReview = async (req, res) => {
    const prdId = req.params.prdId;
    const cusId = req.user.id;//for delete button
    try {

        const reviews = await reviewModel.find({ productID: prdId })
            .populate({
                path: "customerID",
                select: 'firstName lastName'
            })
            .select('customerReview sellerReplay createdAt')
            .sort({ createdAt: -1 })

        // Reorder: Move the logged-in user's review to index 0
        const sortedReviews = reviews.sort((a, b) => {
            if (a.customerID._id.toString() === cusId) return -1;
            if (b.customerID._id.toString() === cusId) return 1;
            return 0;
        });

        //check customer can review this product
        const order = await orderModel.find({ customerID: cusId, productID: prdId, status: "Delivered" });
        const existingReview = await reviewModel.findOne({ customerID: cusId, productID: prdId });
        let disableButton;//for controll post review button
        if (order.length === 0 || existingReview) {
            disableButton = true;
        } else {
            disableButton = false;
        }

        res.status(200).json({ reviewData: sortedReviews, cusId: cusId, buttonFleg: disableButton })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


const deleteCustomerReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const cusId = req.user.id;
    try {
        // Use the Review's _id, but ensure it belongs to the logged-in customer
        const deletedReview = await reviewModel.findOne({
            _id: reviewId,
            customerID: cusId
        });

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }
        //if seller replay to this review they can't remove this
        if (deletedReview.sellerReplay.trim() !== "") {
            return res.status(400).json({ message: "Review locked. Seller has replied." });
        }

        await reviewModel.findByIdAndDelete(reviewId);
        res.status(204).end();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

//check seller can replay to customer review
const getSellerReview = async (req, res) => {
    const prdId = req.params.prdId;
    const selId = req.user.id;
    try {
        const reviews = await reviewModel.find({ productID: prdId, sellerID: selId })
            .populate({
                path: "customerID",
                select: 'firstName lastName'
            })
            .select('customerReview sellerReplay createdAt')
            .sort({ createdAt: -1 })

        res.status(200).json({ reviewData: reviews })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })

    }
}

const postSellerReplay = async (req, res) => {

    const { sellerReplay, reviewId } = req.body;
    try {
        const patchReplay = await reviewModel.findByIdAndUpdate(reviewId, { $set: { sellerReplay } }, { new: true })
        if (!patchReplay) return res.status(404).json({ message: "review not found!" });
        res.status(200).json(patchReplay)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });

    }
}

const deleteSelerReplay = async (req, res) => {
    const reviewId = req.params.reviewId;
    try {
        const sellerReplay = "";
        const deleteReplay = await reviewModel.findByIdAndUpdate(reviewId, { $set: { sellerReplay } }, { new: true })
        if (!deleteReplay) return res.status(404).json({ message: "review not found !" })
        res.status(204).json({ message: "deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export { postReview, getCustomerReview, deleteCustomerReview, getSellerReview, postSellerReplay, deleteSelerReplay };