import { useEffect, useState } from "react";
import OrderForm from "../../component/seller/OrderForm";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageOrder() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const { ordId } = useParams();
    const [orderData, setOrderData] = useState({});

    useEffect(() => {
        getOrderByID()
    }, [])

    //get order data by id
    const getOrderByID = () => {
        fetch(apiUrl + '/order/' + ordId)
            .then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json();
            }).then((res) => {
                if (res) {
                    setOrderData(res)
                } else {
                    console.log("Order not found")
                }
            })
    }


    const UpdateOrder = (e) => {
        //Update order details if order status Cancelled increase quantity
        fetch(apiUrl + '/order/' + ordId, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ status: e.status, trackingNo: e.trackingNo, sellerNote: e.sellerNote })
        }).then((res) => {
            if (res.ok) {
                alert("Status Updated");
                getOrderByID();

            } else {
                alert("Can't update !")
            }
        })
    }

    const closeCliked = () => {
        navigate('/view-order');
    }

    return (
        <OrderForm orderData={orderData}
            UpdateOrder={UpdateOrder}
            closeCliked={closeCliked} />
    )
}