import express, { json } from'express';
import connectDB from './config/db.js';
import sellerRouter from './routes/sellerRoute.js';
import customerRouter from './routes/customerRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import reviewRouter from './routes/reviewRouter.js';

const app = express();
connectDB();
app.use(json());
app.use(cors());
app.use('/images', express.static('public/images'));// send image to frontend

app.use(authRouter);
app.use(sellerRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(reviewRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("server listening to port " + port)
})