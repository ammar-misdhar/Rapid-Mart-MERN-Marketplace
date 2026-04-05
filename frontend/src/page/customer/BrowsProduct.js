import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../../component/sheared/ProductCard";
import { useEffect, useState } from "react";
import CustomerNavbar from "../../component/customer/CustomerNavBar";

export default function BrowsProduct() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const role = "customer";
    const navigate = useNavigate();

    const [searchParam, setSearchParam] = useSearchParams();//for URL Changes (update URL), check URL
    const [productData, setProductData] = useState([]);
    const [lenth, setLenth] = useState(0);//total model arrey lenth

    //const [copyProductData, setCopyProductData] = useState([]);

    const totalPage = Math.ceil(lenth / 8);//total model arrey lenth / item per page and round

    const currnentPgae = parseInt(searchParam.get('p')) || 1; //get current page from searchParam serachParam{}then default 1 

    const searchQuary = searchParam.get('qury') || ""; //get Serached item from searchParam

    // Calculate paginated data
    // const start = (page - 1) * itemsPerPage;
    // const end = start + itemsPerPage;
    // const currentProducts = productData.slice(start, end);

    useEffect(() => {

        //getProductData
        const getProductdata = () => {
            fetch(apiUrl + `/products/customer?p=${currnentPgae}&qury=${searchQuary}`)
                .then((res) => {
                    if (!res.ok) {
                        return null
                    }
                    return res.json();
                }).then((res) => {
                    if (res) {
                        setProductData(res.products);
                        setLenth(res.lenth);

                        //setCopyProductData(res.products);
                    } else {
                        console.log("Oops, something went wrong. Please try again later.")
                    }
                });
        }
        getProductdata()
    }, [currnentPgae, searchQuary])



    const searchedProduct = (e) => {
        if (e === "") {
            setSearchParam({ p: 1 });
        } else {
            setSearchParam({ p: 1, qury: e });
        }

    }


    const handlePageClick = (e) => {
        const searchLocalStorage = localStorage.getItem('search') || "";
        if (searchLocalStorage === "") {

            setSearchParam({ p: currnentPgae + e })//change the URL p
        } else {
            setSearchParam({ p: currnentPgae + e, qury: searchLocalStorage })//change the URL p

        }

    }

    const clickPlaceOrder = (e) => {
        navigate('/place-order/' + e)
    }

    // send seleted product ID to productDetail
    const selectedProductID = (e) => {
        navigate('/product/' + e);
    }

    return (
        <div>
            <CustomerNavbar />
            <ProductCard role={role}
                productData={productData}
                currentPage={currnentPgae}
                totalPage={totalPage}
                clickPlaceOrder={clickPlaceOrder}
                selectedProductID={selectedProductID}
                searchedProduct={searchedProduct}
                pageNo={handlePageClick} />
        </div>

    )
}