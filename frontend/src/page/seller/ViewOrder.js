import { useNavigate } from "react-router-dom";
import SellerNavBar from "../../component/seller/SellerNavBar";
import OrderList from "../../component/sheared/OrderList";
import { useEffect, useState } from "react";


export default function ViewOrders() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    
    const role = "seller";//for ui changes
    const token = localStorage.getItem("token");

    const [OrderData, setOrderData] = useState([]);

    // const [product, setProduct] = useState([]);
    // const [orders, setOrders] = useState([]);
    // const [customer, setCustomer] = useState([]);
    
    useEffect(() => {
        if (!token) return;

        //get seller order
        const getSellerOrder = () => {
            fetch(apiUrl + `/order/seller`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json()

            }).then((res) => {
                if (res) {
                    setOrderData(res);
                } else {
                    console.log("can't get orders !")
                }
            })
        }
        getSellerOrder()

        // const getAllData = async () => {
        //     const [product, orders, customer] = await Promise.all([
        //         fetch(apiUrl + '/product').then(res => res.json()),
        //         fetch(apiUrl + '/order').then(res => res.json()),
        //         fetch(apiUrl + '/customer').then(res => res.json())
        //     ]);
        //     setProduct(product);
        //     setOrders(orders);
        //     setCustomer(customer);
        // }

        // getAllData();
    }, [token])


    // const ord = orders.map((order) => {
    //     const prd = product.find((product) => product._id === order.productID);
    //     const cust = customer.find((customer) => customer._id === order.customerID);
    //     return {
    //         sellerID: prd.sellerID,
    //         orderId: order?._id,
    //         custFirstName: cust?.firstName,
    //         custLastName: cust?.lastName,
    //         custContact: cust?.contact,
    //         quantity: order?.quantity,
    //         status: order?.status,
    //         productName: prd?.productName,
    //         totalPrice: prd?.sellingPrice * order.quantity,
    //         trackingNo: order?.trackingNo,
    //         address: order?.address,
    //         sellerNote: order?.sellerNote
    //     }
    // })

    // const slectedOrder = ord.filter((ordList) => ordList.sellerID === selID)

    const clickEdit = (e) => {
        navigate('/manage-order/' + e);
    }

    return (
        <>
            <SellerNavBar />
            <OrderList OrderData={OrderData}
                role={role}
                clickEdit={clickEdit}
            />
        </>
    );
}