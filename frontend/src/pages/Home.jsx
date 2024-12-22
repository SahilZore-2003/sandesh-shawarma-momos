import { useRef, useState } from "react";
import BottomBar from "../components/BottomBar";
import HomeContent from "../components/home/HomeContent";
import Cart from "./Cart";
import Orders from "./Orders";
import Profile from "./Profile";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/cartContext";
const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const parentRef = useRef()



    const components = [
        <HomeContent />,
        <Orders />,
        <Profile />,
        <Cart setActiveIndex={setActiveIndex} />,
    ]
    return (
        <CartProvider>
            <div className="flex flex-col max-h-screen overflow-y-hidden ">
                <div className=" text-sm pb-24 grow   w-full p-2 h-full overflow-y-scroll" ref={parentRef}>
                    <Navbar />
                    {components[activeIndex]}
                </div>
                <BottomBar parentRef={parentRef} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </div>
        </CartProvider>

    )
}

export default Home
