import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductForm from "../../component/seller/ProductForm";
import { useEffect, useState } from "react";

export default function ManageProduct() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [selectedProduct, setselectedProduct] = useState({});//for upadte data fill

    const token = localStorage.getItem("token");
    const { oparator } = useParams();

    const prdId = searchParam.get('prdId') || "";

    useEffect(() => {
        if (oparator !== 'add-prd' && prdId) {

            fetch(apiUrl + `/product/${prdId}`)
                .then((res) => {
                    if (!res.ok) {
                        return null;
                    }
                    return res.json();
                }).then((res) => {
                    if (res) {

                        setselectedProduct(res);
                    } else {
                        console.log("can't find the product!")
                    }
                })
        }
    }, [prdId])

    //get and post product data for edit and post product both
    const formData = (e) => {
        if (oparator !== 'add-prd' && !prdId) return;

        // 1. Create a new FormData instance
        const data = new FormData();
        // 2. Append all your fields manually
        data.append('productName', e.productName);
        data.append('productDescription', e.productDescription);
        data.append('productStock', e.productStock);
        data.append('costPrice', e.costPrice);
        data.append('sellingPrice', e.sellingPrice);

        // 3. Append the image file (the key 'image' must match Multer's upload.single('image'))
        if (e.image && e.image instanceof File) {
            data.append('image', e.image);
        }

        const endPoint = oparator === 'add-prd' ? `/product` : `/product/${prdId}`;
        const methord = oparator === 'add-prd' ? "POST" : "PUT";

        fetch(apiUrl + endPoint, {
            method: methord,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: data
        }).then((res) => {
            if (!res.ok) {
                alert("can't do this oparation")
            } else {
                if (oparator === "add-prd") {
                    alert("Product posted")
                } else {
                    alert("Product Updated")
                }
            }
        })
    }

    const goBack = () => {
        navigate(-1)
    }

    return (

        <ProductForm
            formData={formData}
            goBack={goBack}
            selectedProduct={selectedProduct}
            oparator={oparator}
        />

    )
}