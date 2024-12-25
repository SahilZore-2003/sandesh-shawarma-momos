import { useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";

const authContext = createContext()

export const authProvider = ({ children }){

    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLaoding] = useState(true);

    const initializeUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user })
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLaoding(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe;
    }, [])

    const value = {
        currentUser, userLoggedIn, loading
    }


    return (
        <authContext.Provider value={value}>
            {
                !loading && children
            }
        </authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}