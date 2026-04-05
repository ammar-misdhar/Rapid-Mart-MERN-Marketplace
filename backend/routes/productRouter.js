import express from 'express'
import { getAllProduct, getProductByID, getSellerProduct, postNewProduct, updateProduct, updateStock } from '../controllers/productController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const productRouter = express.Router();

//post new product seller
productRouter.post('/product', protect("seller"),upload.single('image'), postNewProduct);
//get all product customer
productRouter.get('/products/customer', getAllProduct);
// get seller product
productRouter.get('/products/seller', protect("seller"), getSellerProduct);
//get product by id for product detail and checkout edit product form
productRouter.get('/product/:prdId', getProductByID);
//update product details seller
productRouter.put('/product/:prdId', protect("seller"),upload.single('image') ,updateProduct);
//update product stock when customer by
productRouter.patch('/product/stock/:prdId', updateStock);

export default productRouter