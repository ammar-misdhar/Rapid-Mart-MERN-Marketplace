import express from 'express'
import { getCustomerByID, postCustomer } from '../controllers/customerController.js';
import protect from '../middleware/authMiddleware.js';

const customerRouter = express.Router();

//post new customer
customerRouter.post('/new-customer', postCustomer);
//get customer by token for nav bar
customerRouter.get('/customer/profile', protect('customer'), getCustomerByID);

export default customerRouter