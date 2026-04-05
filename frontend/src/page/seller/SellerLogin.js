import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AuthLoginForm from "../../component/sheared/AuthLoginForm";

export default function SellerLogin() {

    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const role = "seller";
    const { fetchUser } = useContext(UserContext);

    const loginData = (e) => {
        fetch(apiUrl + '/api/auth/seller', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: e.email, password: e.password })
        }).then((res) => {
            if (!res.ok) {
                return null;
            }
            return res.json()
        }).then((res) => {
            if (res && res.token) {
                //for navbar data load
                fetchUser(res.token, role)
                console.log("seller verified");
                navigate('/dashboard');
            } else {
                alert("Invalid email or password");
            }
        }).catch((err) => {
            console.error("Fetch error:", err);
        })
    }

    const signUp=(e)=>{
        if(e==="seller"){
            navigate('/seller-register')
        }
    }

    return (
        <AuthLoginForm loginData={loginData}
        signUp={signUp}
            role={role} />
    )
}