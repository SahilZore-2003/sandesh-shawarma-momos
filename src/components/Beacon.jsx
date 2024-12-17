import React, { useState } from "react";
import { BsCart } from "react-icons/bs";

const CartBeacon = ({count}) => {
   
    return (
        <div className=" bg-primary rounded-full size-5 grid place-items-center text-white text-xs absolute top-0 right-[10%]">
           {count}
        </div>
    );
};

export default CartBeacon;
