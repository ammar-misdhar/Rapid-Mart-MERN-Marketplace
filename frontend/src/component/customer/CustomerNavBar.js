import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";


export default function CustomerNavbar() {

    // const apiUrl = 'http://localhost:8000';

    const { userData, signOut } = useContext(UserContext);
    const navigate = useNavigate();

    // const [customerData, setCustomerData] = useState({});
    // const [loading, setloading] = useState(true);

    // useEffect(() => {
    //     //get customer data to set nav bar
    //     const getCustomerByID = () => {
    //         fetch(apiUrl + '/customer/' + cusId)
    //             .then((res) => res.json())
    //             .then((res) => {
    //                 setCustomerData(res)
    //                 setloading(false)
    //             })
    //     }
    //     getCustomerByID()
    // }, [])


    const goToHome = () => {
        if (localStorage.getItem('search')) {
            localStorage.removeItem('search');
        }
        navigate('/shop')

    }

    const trckOrder = () => {
        navigate('/treck-order');
    }

    const signOutUser = () => {
        signOut();
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 border-bottom">
            <div className="container-fluid">
                {/* Brand/Logo */}
                <p
                    className="navbar-brand mb-0 fw-bold fs-4"
                    style={{ cursor: 'pointer' }}
                    onClick={goToHome}
                >
                    Repid Mart Shopping
                </p>

                {/* Hamburger Toggle Button (Mobile) */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Container for right-side items */}
                    <div className="navbar-nav ms-auto align-items-lg-center pt-3 pt-lg-0">

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

                        {/* Action Buttons */}
                        <div className="d-flex flex-column flex-lg-row gap-2">
                            <button className='btn btn-outline-primary px-3' onClick={trckOrder}>
                                Track my Orders
                            </button>
                            <button className='btn btn-outline-danger px-3' onClick={signOutUser}>
                                Sign out
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}