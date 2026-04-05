import { json } from "express";
import sellerModel from "../model/sellerModel.js"

//post new seller
const postSeller = async (req, res) => {
    const { userName, firstName, lastName, password, email, contact } = req.body

    try {
        const existingSeller = await sellerModel.findOne({ email: email })
        if (existingSeller) {
            return res.status(400).json({ message: "seller already existed" });
        }

        const newSeller = new sellerModel({ userName, firstName, lastName, password, email, contact })
        await newSeller.save();
        res.status(200).json(newSeller);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//get seller by id for nav bar
const getSellerByID = async (req, res) => {
    const id = req.user.id;
    try {
        const seller = await sellerModel.findById(id)
            .select('firstName lastName')
        res.status(200).json(seller)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//update seller
const putSeller = async (req, res) => {
    const id = req.user.id
    const { userName, firstName, lastName, password, email, contact } = req.body;
    try {
        const updateSeller = await sellerModel.findByIdAndUpdate(id, { userName, firstName, lastName, password, email, contact }, { new: true })
        if (!updateSeller) {
            console.log("unable to update seller")
        }
        res.json(updateSeller);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//delete seller
const deleteSeller = async (req, res) => {
    const id = req.user.id;
    try {
        await sellerModel.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        console.log(error);
        res.status(500), json({ message: error.message });
    }
}

export { postSeller, putSeller, deleteSeller, getSellerByID };