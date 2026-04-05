import mongoose from "mongoose";
import productModel from "../model/productMoodel.js";

//post new product seller
const postNewProduct = async (req, res) => {
    const sellerID = req.user.id;
    const { productName, productDescription, productStock, costPrice, sellingPrice } = req.body;
    try {
        const image = req.file.filename;//product image

        const newProduct = new productModel({
            productName,
            productDescription,
            productStock,
            costPrice,
            sellingPrice,
            image,
            sellerID: new mongoose.Types.ObjectId(sellerID)
        });

        await newProduct.save()
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//with Pagination
//get product for brows product customer
const getAllProduct = async (req, res) => {

    const qury = req.query.qury || "";

    //for Pagination
    const page = req.query.p;//current page
    const limit = 8;//item per page

    try {
        if (qury !== "") {
            // Create the search filter once so it's identical for both calls
            const searchFilter = { productName: { $regex: qury, $options: 'i' } };

            const searchedProduct = await productModel.find(searchFilter)
                .select('productName productDescription productStock sellingPrice image')
                .skip((page - 1) * limit)
                .limit(limit);

            // 2. Get the TOTAL number of items that match this search
            const searchedLen = await productModel.countDocuments(searchFilter);

            res.status(200).json({ products: searchedProduct, lenth: searchedLen })
        } else {
            const product = await productModel.find()
                .select('productName productDescription productStock sellingPrice image')
                .skip((page - 1) * limit)//start
                .limit(limit)//start + limit

            const len = await productModel.countDocuments();//for total page
            res.status(200).json({ products: product, lenth: len });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//with Pagination
//getSellerProduct
const getSellerProduct = async (req, res) => {
    const selId = req.user.id;
    //for search
    const qury = req.query.qury;
    //for Pagination
    const page = req.query.p;
    const limit = 8;

    try {
        if (qury !== "") {

            // Create the search filter once so it's identical for both calls
            const searchFilter = { sellerID: selId, productName: { $regex: qury, $options: 'i' } };

            const searchedProduct = await productModel.find(searchFilter)
                .select('productName productDescription productStock sellingPrice image')
                .skip((page - 1) * limit)
                .limit(limit);

            // 2. Get the TOTAL number of items that match this search
            const searchedLen = await productModel.countDocuments(searchFilter);

            res.status(200).json({ products: searchedProduct, lenth: searchedLen });

        } else {
            const sellerProduct = await productModel.find({ sellerID: selId })
                .select('productName productDescription productStock sellingPrice image')
                .skip((page - 1) * limit)
                .limit(limit)
            const len = await productModel.countDocuments({ sellerID: selId });//for total page
            res.status(200).json({ products: sellerProduct, lenth: len });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//get product by token id for product detail and checkout edit product form
const getProductByID = async (req, res) => {
    const prdId = req.params.prdId;
    try {
        const product = await productModel.findById(prdId)
            .select('productName productDescription productStock sellingPrice image')
        if (!product) return res.status(404).json("Product not found !");
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

//update product details seller
const updateProduct = async (req, res) => {
    const prdId = req.params.prdId;
    const sellerID = req.user.id;

    const { productName, productDescription, productStock, costPrice, sellingPrice } = req.body;

    const updateData = {
        productName,
        productDescription,
        productStock,
        costPrice,
        sellingPrice,
        sellerID: new mongoose.Types.ObjectId(sellerID)
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }

    try {
        const updateProduct = await productModel.findByIdAndUpdate(prdId, updateData, { new: true })

        if (!updateProduct) return res.status(404).json("unable to update product");
        res.status(200).json(updateProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//update product stock when customer by
const updateStock = async (req, res) => {
    const prdId = req.params.prdId
    const { productStock } = req.body;
    try {
        const updateData = await productModel.findByIdAndUpdate(prdId, { $set: { productStock } }, { new: true })
        if (!updateData) return res.status(401).json({ message: "can't reduce stock" });
        res.status(200).json("Stock Updated !")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export { postNewProduct, getAllProduct, updateProduct, getProductByID, updateStock, getSellerProduct }