import express from 'express';
import { deleteCustomerReview, deleteSelerReplay, getCustomerReview, getSellerReview, postReview, postSellerReplay } from '../controllers/reviewController.js';
import protect from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/review', protect("customer"), postReview);
reviewRouter.patch('/seller-replay', postSellerReplay);
reviewRouter.get('/customerReview/:prdId', protect("customer"), getCustomerReview);
reviewRouter.get('/sellerReview/:prdId', protect("seller"), getSellerReview);
reviewRouter.delete('/delete-review/:reviewId', protect("customer"), deleteCustomerReview);
reviewRouter.patch('/delete-replay/:reviewId', deleteSelerReplay);

export default reviewRouter;