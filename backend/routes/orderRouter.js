import express from 'express'
import { getCustomerOrder, getOrderByID, getSellerOrder, postOrder, updateSomeOrderData } from '../controllers/orderController.js';
import protect from '../middleware/authMiddleware.js';


const orderRouter = express.Router();

//post new order
orderRouter.post('/order', protect("customer"), postOrder);
//get customer order by id token
orderRouter.get('/order/customer', protect("customer"), getCustomerOrder);
//get seller order by Id
orderRouter.get('/order/seller', protect("seller"), getSellerOrder);
//get order by ID for patch some details form
orderRouter.get('/order/:ordId', getOrderByID);
//patch some details of order status trackingNo...if order status Cancelled increase quantity
orderRouter.patch('/order/:ordId', updateSomeOrderData);

export default orderRouter