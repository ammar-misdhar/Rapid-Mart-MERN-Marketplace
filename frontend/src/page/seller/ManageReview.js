import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import SellerNavBar from "../../component/seller/SellerNavBar";
import ReviewCard from "../../component/sheared/ReviewCard";

export default function ManageReview() {

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    const [reviewData, setReviewData] = useState([]);
    const [productData, setProductdata] = useState({});//for show product details
    const { prdId } = useParams();

    const role = "seller";

    useEffect(() => {

        const getProduct = () => {
            fetch(apiUrl + `/product/${prdId}`)
                .then((res) => {
                    if (!res.ok) {
                        return null;
                    }
                    return res.json();
                }).then((res) => {
                    if (res) {
                        setProductdata(res);
                    } else {
                        console.log("can't get product");
                    }
                })
        }

        getProduct();
        getSellerReview();
    }, []);

    const getSellerReview = () => {
        fetch(apiUrl + `/sellerReview/${prdId}`, {
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
                setReviewData(res.reviewData)
            } else {
                console.log("can't get rivew data !")
            }
        })
    }

    const postReplay = (e) => {
        fetch(apiUrl + '/seller-replay', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reviewId: e.reviewId, sellerReplay: e.replay })
        }).then((res) => {
            if (res.ok) {
                getSellerReview();
                console.log("replay posted")
            } else {
                console.log("can'post replay")
            }
        })
    }

    const handleDeleteReplay = (e) => {
        fetch(apiUrl + `/delete-replay/${e}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 204) {
                alert("replay deleted !")
                getSellerReview();
            } else {
                console.log("can't delete replay")
            }
        })
    }

    return (
        <>
            <SellerNavBar />
            <ReviewCard reviewData={reviewData}
                productData={productData}
                role={role}
                postReplay={postReplay}
                handleDeleteReplay={handleDeleteReplay} />
        </>
    )
}