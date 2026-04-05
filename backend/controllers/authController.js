import customerModel from "../model/customerModel.js";
import sellerModel from "../model/sellerModel.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const customerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await customerModel.findOne({ email })
        if (!customer || customer.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: customer._id, role: "customer" },
            process.env.JWT_SECRET
        )
        res.status(200).json({ token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const seller = await sellerModel.findOne({ email })
        if (!seller || seller.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        //Generate the Token
        const token = jwt.sign(
            { id: seller._id, role: "seller" },
            process.env.JWT_SECRET
        )

        res.status(200).json({ token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

export { customerLogin, sellerLogin }