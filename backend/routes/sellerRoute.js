import express from 'express';
import { postSeller, putSeller, deleteSeller, getSellerByID } from '../controllers/sellerController.js'
import protect from '../middleware/authMiddleware.js';
const sellerRouter = express.Router();

//post new seller
sellerRouter.post('/new-seller', postSeller);
//get seller by id token for nav bar
sellerRouter.get('/seller/profile', protect('seller'), getSellerByID);

sellerRouter.put('/seller/update', protect('seller'), putSeller);

sellerRouter.delete('/seller/delete', protect('seller'), deleteSeller);

export default sellerRouter