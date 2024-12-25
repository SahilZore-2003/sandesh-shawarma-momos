import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const authContext = createContext()

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });;
    const navigate = useNavigate()


    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        } else {
            localStorage.setItem('user', JSON.stringify(currentUser))
            navigate("/")
        }

    }, [currentUser, navigate]);

    const value = {
        currentUser, setCurrentUser
    }


    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext)
}

export {
    AuthProvider,
    useAuth
}