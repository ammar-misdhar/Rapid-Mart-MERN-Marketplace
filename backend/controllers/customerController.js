import customerModel from "../model/customerModel.js";

//post new customer
const postCustomer = async (req, res) => {
    const { userName, firstName, lastName, email, password, contact, address } = req.body;
    try {
        const existingCustomer = await customerModel.findOne({ email: email })
        if (existingCustomer) {
            return res.status(400).json({ message: "customer already existed" });
        }

        const newCustomer = new customerModel({ userName, firstName, lastName, email, password, contact, address });
        await newCustomer.save()
        res.status(200).json(newCustomer)
    } catch (error) {
        console.log(error);
        res.status(500).json({ massage: error.massage })
    }
}

//get customer by token for nav bar
const getCustomerByID = async (req, res) => {
    const id = req.user.id;
    try {
        const customer = await customerModel.findById(id)
            .select('firstName lastName address')
        res.status(200).json(customer)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export { postCustomer, getCustomerByID }


