import { useNavigate, useParams } from "react-router-dom"
import Imagegallery from "../../component/customer/ImageGallery";
import { useEffect, useState } from "react";
import CustomerNavbar from "../../component/customer/CustomerNavBar";
import ReviewCard from "../../component/sheared/ReviewCard";


export default function ProductDetails() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { prdId } = useParams();

    const role="customer";

    const [productData, setProductData] = useState({});
    const [reviewData, setReviewData] = useState([]);

    const [reviewButtonFlag, setReviewButtonFlag] = useState(false);//enable diable post review button
    const [loginCustomer, setLoginCustomer] = useState("");//customer id for show delete button for posted review

    useEffect(() => {
        //getSelectedProductData
        const getProductdata = () => {
            fetch(apiUrl + `/product/${prdId}`)
                .then((res) => {
                    if (!res.ok) {
                        return null;
                    }
                    return res.json();
                }).then((res) => {
                    if (res) {
                        setProductData(res);
                    } else {
                        console.log("can't find product")
                    }
                });
        }

        getProductdata();
        getReview();
    }, [])

    //get review data and check the login customr can review this product
    const getReview = () => {
        fetch(apiUrl + `/customerReview/${prdId}`, {
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
                setReviewData(res.reviewData);
                setLoginCustomer(res.cusId);//get customerid for delete button
                setReviewButtonFlag(res.buttonFleg);//enable diable post review button
            } else {
                console.log("can't get rivew data !")
            }
        })
    }

    //post new customer review
    const postReview = (e) => {
        fetch(apiUrl + '/review', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productID: prdId, customerReview: e })
        }).then((res) => {
            if (!res.ok) {
                return null;
            }
            return res.json()
        }).then((res) => {
            if (res) {
                console.log("review posted")
                //checkAbilityReview();
                getReview();
            } else {
                console.log("can't post review")
            }
        })
    }

    //delte login customer review
    const handleDeleteReview = (e) => {
        fetch(apiUrl + `/delete-review/${e}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 204) {
                console.log("review deleted")
                //checkAbilityReview();
                getReview();
            } else if(res.status===400) {
                alert("Review locked. Seller has replied.")
            }else{
                console.log("Review not found")
            }
        })

    }

    const placeOrder = () => {
        navigate('/place-order/' + prdId);
    }
    return (
        <>
            <CustomerNavbar />
            <Imagegallery selectedProduct={productData}
                placeOrder={placeOrder}
            />
            <ReviewCard
                reviewData={reviewData}
                reviewButtonFlag={reviewButtonFlag}
                loginCustomer={loginCustomer}
                postreview={postReview}
                handleDeleteReview={handleDeleteReview}
                role={role}
            />
        </>
    )
}