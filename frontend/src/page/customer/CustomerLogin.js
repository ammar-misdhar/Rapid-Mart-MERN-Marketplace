import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthLoginForm from "../../component/sheared/AuthLoginForm";

export default function CustomerLogin() {
    const apiUrl = process.env.REACT_APP_API_URL;

    const role = "customer";
    const { fetchUser } = useContext(UserContext);

    const navigate = useNavigate();

    const loginData = (e) => {
        fetch(apiUrl + '/api/auth/customer', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: e.email, password: e.password })
        }).then((res) => {
            if (!res.ok) {
                // We don't return anything here, or return null
                return null;
            }
            return res.json();
        }).then((data) => {
            // We MUST check if data exists before accessing .userId
            if (data && data.token) {
                fetchUser(data.token, role);
                console.log("customer verified");
                navigate('/shop'); // Fixed typo to navigate
            } else {
                // This runs if the response was NOT ok (because we returned null)
                alert("Invalid email or password");
            }
        }).catch((err) => {
            // This only runs if there is a network/server crash
            console.error("Fetch error:", err);
        });
    }
    const signUp = (e) => {
        if(e==="customer"){
            navigate('/customer-register')
        }
    }
    return (
        <AuthLoginForm loginData={loginData}
            signUp={signUp}
            role={role} />
    )
}