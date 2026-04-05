import { useNavigate } from "react-router-dom";
import AuthRegisterForm from "../../component/sheared/AuthRegisterForm";

export default function SellerRegister() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const role = "seller";
    const navigate = useNavigate();

    const onSubmit = (e) => {
        fetch(apiUrl + '/new-seller', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userName: e.userName,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    email: e.email,
                    password: e.password,
                    contact: e.contact,
                })
        }).then((res) => {
            if (res.status === 400) {
                alert("customer already existed !")
            } else {
                alert("Account created successfull !")

            }
        }).catch((err) => {
            console.error("Fetch error:", err);
        })
    }
    const login = (e) => {
        if(e==="seller"){
            navigate(-1);
        }
    }
    return (
        <>
            <AuthRegisterForm onSubmit={onSubmit}
                role={role}
                login={login} />
        </>
    )
}