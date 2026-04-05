import { BrowserRouter, Route, Routes } from "react-router"

import BrowsProduct from "../page/customer/BrowsProduct";
import ProductDetails from "../page/customer/ProductDetails";
import PlaceOrder from "../page/customer/PlaceOrder";
import MyOrders from "../page/customer/MyOrders";
import ViewOrders from "../page/seller/ViewOrder";
import ViewProduct from "../page/seller/ViewProducts";
import ManageOrder from "../page/seller/ManageOrder";
import ManageProduct from "../page/seller/ManageProduct";
import HomePage from "../page/sheared/HomePage";
import CustomerLogin from "../page/customer/CustomerLogin";
import SellerLogin from "../page/seller/SellerLogin";
import ManageReview from "../page/seller/ManageReview";
import CustomerRegister from "../page/customer/CustomerRegister";
import SellerRegister from "../page/seller/SellerRegister";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Shred pages Routes */}
                <Route path="/" element={<HomePage />} />
                {/* Customer Pages Routes */}
                <Route path="/customer-login" element={<CustomerLogin />} />
                <Route path="/shop" element={<BrowsProduct />} />
                <Route path="/product/:prdId" element={<ProductDetails />} />
                <Route path="/place-order/:prdId" element={<PlaceOrder />} />
                <Route path="/treck-order" element={<MyOrders />} />
                <Route path="/customer-register" element={<CustomerRegister />} />
                {/* Seller Pages Routes */}
                <Route path="/seller-login" element={<SellerLogin />} />
                <Route path="/dashboard" element={<ViewProduct />} />
                <Route path="/view-order" element={<ViewOrders />} />
                <Route path="/manage-product/:oparator" element={<ManageProduct />} />
                <Route path="/manage-order/:ordId" element={<ManageOrder />} />
                <Route path="/manage-review/:prdId" element={<ManageReview />} />
                <Route path="/seller-register" element={<SellerRegister/>} />

            </Routes>
        </BrowserRouter>
    );
}