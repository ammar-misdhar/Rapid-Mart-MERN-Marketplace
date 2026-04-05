import { useNavigate, useParams } from "react-router-dom";
import AddOrder from "../../component/customer/AddOrder";
import { useEffect, useState } from "react";
import CustomerNavbar from "../../component/customer/CustomerNavBar";


export default function PlaceOrder() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const { prdId } = useParams();

    const [productData, setProductData] = useState({});

    useEffect(() => {
        getProductData();

    }, [])

    // get product data by id
    const getProductData = () => {
        fetch(apiUrl + '/product/' + prdId)
            .then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json();
            }).then((res) => {
                if (res) {
                    setProductData(res)
                } else {
                    console.log("can't find product");
                }
            })
    }

    //place order to DB
    const prdQuantity = (e) => {
        if (!productData) return;

        //store to order collection
        fetch(apiUrl + '/order', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            //customer id send via headers
            body: JSON.stringify({ productID: prdId, quantity: e.quantity, status: "panding", address: e.address, amount: e.amount })
        }).then((res) => {
            if (!res.ok) {
                alert("can't place order !")
            } else {
                alert("Order placement successfull !")
                //calculate reduce stock
                const reducedStock = productData.productStock - e.quantity;
                //update stock in product collection
                fetch(apiUrl + '/product/stock/' + prdId, {
                    method: "PATCH",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ productStock: reducedStock })
                }).then((res) => {
                    if (!res.ok) {
                        console.log("Can't reduce stock")
                    } else {
                        console.log("Stock updated")
                        getProductData();
                    }
                })
            }
        })

    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <CustomerNavbar />
            <AddOrder productData={productData}
                prdQuantity={prdQuantity}
                goBack={goBack} />
        </>
    );
}