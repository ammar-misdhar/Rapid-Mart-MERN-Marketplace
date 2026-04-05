import { useEffect, useState } from "react";
import OrderList from "../../component/sheared/OrderList";
import CustomerNavbar from "../../component/customer/CustomerNavBar";

export default function MyOrders() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const role = 'customer';//for ui changes
    const token = localStorage.getItem("token")

    const [OrderData, setOrderData] = useState([]);

    // const [orderdata, setOrderData] = useState([]);
    // const [productdata, setProductData] = useState([]);
    // const [sellerdata, setSellerdata] = useState([]);

    useEffect(() => {

        if (!token) return;
        getCustomerOrder()

        // const loadAlldata = async () => {
        //     const [orders, products, sellers] = await Promise.all([
        //         fetch(apiUrl + '/order').then(res => res.json()),
        //         fetch(apiUrl + '/product').then(res => res.json()),
        //         fetch(apiUrl + '/seller').then(res => res.json())
        //     ]);

        //     setOrderData(orders);
        //     setProductData(products);
        //     setSellerdata(sellers);
        // }
        // loadAlldata()

    }, [token]);

    const getCustomerOrder = () => {
        fetch(apiUrl + '/order/customer', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json()
            })
            .then((res) => {
                if (res) {
                    setOrderData(res);
                } else {
                    console.log("cannot find the orders");
                }
            })
    }

    // //get needed data form state to show on display
    // const ord = orderdata.map((order) => {
    //     const prd = productdata.find((product) => product._id === order.productID);
    //     const sell = sellerdata.find((seller) => seller._id === prd.sellerID);
    //     return {
    //         customerID: order?.customerID,
    //         sellFirstName: sell?.firstName,
    //         sellLastName: sell?.lastName,
    //         trackingNo: order?.trackingNo,
    //         orderId: order?._id,
    //         quantity: order?.quantity,
    //         status: order?.status,
    //         productName: prd?.productName,
    //         totalPrice: prd?.sellingPrice * order.quantity,
    //         sellerNote: order?.sellerNote
    //     };
    // })

    // //selected customer orders
    // const slectedOrder = ord.filter((item) => item.customerID === cusId);
    
    const cancelOrder = (e) => {
        fetch(apiUrl + `/order/${e}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: "Order Canceled" })
        }).then((res) => {
            if (res.ok) {
                alert("Order Canceled!")
                getCustomerOrder();
            } else {
                alert("Can't Cancele Order!")

            }
        })
    }

    return (
        <>
            <CustomerNavbar />
            <OrderList OrderData={OrderData}
                role={role}
                cancelOrder={cancelOrder} />
        </>
    )
}