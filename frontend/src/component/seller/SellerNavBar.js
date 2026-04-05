import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function SellerNavBar() {

    // const apiUrl = 'http://localhost:8000';
    // const [sellerData, setSellerData] = useState({});

    const { userData, signOut } = useContext(UserContext);
    const navigate = useNavigate();

    // useEffect(() => {
    //     getSellerByID();
    // }, [])

    // const getSellerByID = () => {
    //     fetch(apiUrl + '/seller/' + selId)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setSellerData(res);
    //         })
    // }

    const goToHome = () => {
        if (localStorage.getItem('search')) {
            localStorage.removeItem('search');
        }
        navigate('/dashboard');
    }
    const trckOrder = () => {
        navigate('/view-order');
    }
    const manageProduct = () => {
        navigate('/manage-product/add-prd');
    }
    const signOutSeller = () => {
        signOut();
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 border-bottom">
            <div className="container-fluid">
                {/* Left Side: Brand + Seller Center Title */}
                <div className="d-flex align-items-center">
                    <p
                        className="navbar-brand mb-0 fw-bold fs-4 text-dark"
                        style={{ cursor: 'pointer' }}
                        onClick={goToHome}
                    >
                        Repid Mart Shopping
                    </p>
                    <p className="mb-0 fs-5 ps-2 border-start ms-2 text-secondary d-none d-sm-block">
                        Seller Center
                    </p>
                </div>

                {/* Hamburger Toggle (Mobile) */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sellerNavbar"
                    aria-controls="sellerNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse" id="sellerNavbar">
                    <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center mt-3 mt-lg-0">

                        {/* User Info Section */}
                        <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-4">
                            <div
                                className="rounded-circle text-white d-flex align-items-center justify-content-center me-2"
                                style={{ width: '35px', height: '35px', fontWeight: 'bold', backgroundColor: "#dee2e6" }}
                            >
                                {userData?.firstName?.charAt(0)}
                            </div>
                            <div className="d-flex flex-column">
                                <small className="text-muted lh-1">Welcome,</small>
                                <p className="mb-0 fw-bold">
                                    {userData?.firstName} {userData?.lastName}
                                </p>
                            </div>
                        </div>

                        {/* Seller Action Buttons */}
                        <div className="d-flex flex-column flex-lg-row gap-2">
                            <button className='btn btn-outline-primary' onClick={trckOrder}>
                                Manage Orders
                            </button>
                            <button className='btn btn-outline-primary' onClick={manageProduct}>
                                Add Product
                            </button>
                            <button className='btn btn-outline-danger' onClick={signOutSeller}>
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}