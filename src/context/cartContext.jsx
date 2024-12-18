import { useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log("🚀 ~ CartProvider ~ cart:", cart)

    const handleAddToCart = data => {
        const item = cart.find(item => item.name === data.name)
        if (!item) {
            setCart([...cart, { ...data, quntity: 1 }])
        }
    }

    const handleIncreaseQnt = data => {
        const newCartData = [...cart];
        const index = cart.findIndex((item) => item.name === data.name)
        newCartData[index].quntity = data.quntity + 1;
        setCart(newCartData)
    }

    const handleDecreaseQnt = data => {
        const newCartData = [...cart];
        const index = cart.findIndex((item) => item.name === data.name)
        newCartData[index].quntity = data.quntity === 1 ? 1 : data.quntity - 1;
        setCart(newCartData)
    }

    const handleRemoveFromCart = name => {
        setCart([...cart.filter((item)=>item.name !== name)])
    }


    const value = {
        cart,
        setCart,
        handleAddToCart,
        handleIncreaseQnt,
        handleDecreaseQnt,
        handleRemoveFromCart
    }


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => {
    return useContext(CartContext)
}

export {
    CartProvider,
    useCart
}