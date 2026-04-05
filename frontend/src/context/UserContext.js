import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");

        if (token && role) {
            fetchUser(token, role);
        }

    }, [])

    // for navbar
    const fetchUser = (token, role) => {
        if (!token || !role) return;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);

        const endPoint = role === 'seller' ? '/seller/profile' : '/customer/profile';

        fetch(apiUrl + endPoint, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                return null
            }
            return res.json()
        }).then((res) => {
            if (res) {
                setUserData(res);
            } else {
                console.log("Data not found");
            }
        }).catch((err) => {
            console.log("Error fetching user:", err)
        })
    }

    const signOut = () => {
        setUserData({})
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("search");
    }


    return (
        <UserContext.Provider value={{ userData, fetchUser, signOut }}>
            {children}
        </UserContext.Provider>
    )
}