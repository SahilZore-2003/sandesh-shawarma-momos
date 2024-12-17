import React, { useState } from "react";
import { BsCart } from "react-icons/bs";

const CartBeacon = () => {
    // Simulated cart count
    const [cartCount, setCartCount] = useState(3);

    return (
        <div className=" bg-primary rounded-full size-5 grid place-items-center text-white text-xs absolute top-0 right-[10%]">
            10
        </div>
    );
};

export default CartBeacon;
