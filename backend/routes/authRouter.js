import express from 'express'
import { customerLogin, sellerLogin } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/api/auth/customer', customerLogin);
authRouter.post('/api/auth/seller', sellerLogin);

export default authRouter