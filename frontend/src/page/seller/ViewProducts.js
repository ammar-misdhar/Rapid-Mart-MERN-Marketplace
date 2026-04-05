import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../component/sheared/ProductCard";
import { useEffect, useState } from "react";
import SellerNavBar from "../../component/seller/SellerNavBar";

export default function ViewProduct() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const role = 'seller';
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const [searchParam, setSearchParam] = useSearchParams();
    const [productData, setProductData] = useState([]);
    const [lenth, setLenth] = useState("")

    const totalPage = Math.ceil(lenth / 8);

    const currentPage = parseInt(searchParam.get('p')) || 1;
    const searchQuary = searchParam.get('qury') || "";

    useEffect(() => {
        if (!token) return;
        //getSellerProductData
        const getProductdata = () => {
            fetch(apiUrl + `/products/seller?p=${currentPage}&qury=${searchQuary}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {

                if (!res.ok) {
                    return null;
                }
                return res.json();
            }).then((res) => {
                if (res) {
                    setProductData(res.products);
                    setLenth(res.lenth);
                } else {
                    console.log("product not found !")
                }
            });
        }
        getProductdata()
    }, [token, currentPage, searchQuary])

    //login seller product for manage product
    //const sellerProduct = productData.filter((item) => item.sellerID === selId)

    const searchedProduct = (e) => {
        if (e === "") {
            setSearchParam({ p: 1 });
        } else {
            setSearchParam({ p: 1, qury: e });
        }
    }

    const handleEdit = (e) => {
        navigate(`/manage-product/edit-prd?prdId=${e}`);
    }

    const clickManageReview = (e) => {
        navigate(`/manage-review/${e}`);
    }

    const handlePageChange = (e) => {
        const search = localStorage.getItem('search') || "";
        if (search === "") {
            setSearchParam({ p: currentPage + e });
        } else {
            setSearchParam({ p: currentPage + e, qury: search });
        }
    }

    return (
        <>
            <SellerNavBar />
            <ProductCard role={role}
                productData={productData}
                currentPage={currentPage}
                totalPage={totalPage}
                handleEdit={handleEdit}
                searchedProduct={searchedProduct}
                pageNo={handlePageChange}
                clickManageReview={clickManageReview} />
        </>
    )
}