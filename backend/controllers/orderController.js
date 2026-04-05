import mongoose from "mongoose";
import orderModel from "../model/orderModel.js";
import productModel from "../model/productMoodel.js";


//post order
const postOrder = async (req, res) => {
    const { productID, quantity, status, trackingNo, address, amount } = req.body;
    const customerID = req.user.id;

    const verifyProduct = await productModel.findById(productID);

    if (!verifyProduct) return res.status(401).json({ message: "Product not found" });

    try {
        const newOrder = new orderModel({
            customerID: new mongoose.Types.ObjectId(customerID),
            productID: new mongoose.Types.ObjectId(productID),
            quantity,
            status,
            amount,
            trackingNo,
            address
        });

        await newOrder.save()
        res.status(200).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//get customer order by id token
const getCustomerOrder = async (req, res) => {
    try {
        const order = await orderModel.find({ customerID: req.user.id })
            .populate({
                path: 'productID',
                select: 'productName sellingPrice image',

                populate: ({
                    path: 'sellerID',
                    select: 'userName firstName lastName'
                })
            }).sort({ createdAt: -1 })
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

//get seller order by Id 
const getSellerOrder = async (req, res) => {
    const selId = req.user.id;
    try {
        const allOrder = await orderModel.find()
            .populate({
                path: 'productID',
                //match: { sellerID: selId },
                select: 'productName sellingPrice sellerID image'
            })

            .populate({
                path: 'customerID',
                select: 'firstName lastName contact'
            }).sort({ createdAt: -1 })

        // const filteredOrders = allOrder.filter(order => order.productID !== null);
        const filteredOrders = allOrder.filter(order => order.productID?.sellerID.toString() === selId.toString());
        res.status(200).json(filteredOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

//get order by ID for patch some details form
const getOrderByID = async (req, res) => {
    const id = req.params.ordId;
    try {
        const order = await orderModel.findById(id)
            .select('status trackingNo sellerNote quantity')
        if (!order) return res.status(404).json("Order not found");
        res.status(200).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//patch order details if order status Cancelled increase quantity
const updateSomeOrderData = async (req, res) => {
    const { ordId } = req.params;
    const { status, trackingNo, sellerNote } = req.body;
    try {
        const order = await orderModel.findById(ordId)
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (status === "Cancelled" && order.status !== "Cancelled" ||
            status === "Returned" && order.status !== "Returned" ||
            status === "Order Canceled" && order.status !== "Order Canceled") {
            //increase the stock when status cancelled or returend
            await productModel.findByIdAndUpdate(order.productID,
                {
                    $inc: { productStock: order.quantity }
                });
        }
        if (status !== "Cancelled" && order.status === "Cancelled" ||
            status !== "Returned" && order.status === "Returned") {
            //reduce the stock when status cancelled to not cancelles or returend to not redurend
            await productModel.findByIdAndUpdate(order.productID,
                {
                    $inc: { productStock: -order.quantity }
                });
        }

        //patch data to order collection 
        const updateData = await orderModel.findByIdAndUpdate(ordId, { $set: { status, trackingNo, sellerNote } }, { new: true });
        res.status(200).json(updateData)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export { postOrder, updateSomeOrderData, getOrderByID, getCustomerOrder, getSellerOrder }