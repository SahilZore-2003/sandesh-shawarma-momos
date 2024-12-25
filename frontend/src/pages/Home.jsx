import { useRef, useState } from "react";
import BottomBar from "../components/BottomBar";
import HomeContent from "../components/home/HomeContent";
import Cart from "./Cart";
import Orders from "./Orders";
import Profile from "./Profile";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/cartContext";
import { RiUserCommunityLine } from "react-icons/ri";
import Admin from "./Admin";
const Home = () => {
    const admins = [
        "XtRNF5P172NqsEzIqZiQxd55Hu73"
    ]
    const [activeIndex, setActiveIndex] = useState(0);
    const parentRef = useRef()
    const user = JSON.parse(localStorage?.getItem('user'))

    const components = [
        <HomeContent />,
        <Orders setActiveIndex={setActiveIndex} />,
        <Profile />,
        <Cart setActiveIndex={setActiveIndex} />,
        <Admin setActiveIndex={setActiveIndex} />,
    ]
    return (
        <CartProvider>
            <div className="flex flex-col max-h-screen overflow-y-hidden relative">
                <div className=" text-sm pb-24 grow   w-full p-2 h-full overflow-y-scroll" ref={parentRef}>
                    <Navbar />
                    {components[activeIndex]}
                </div>
                {
                    user && user?.uid ? admins.includes(user?.uid) ? <span onClick={() => setActiveIndex(4)} className="bg-primary p-2 z-[10000] text-black border-2 border-black rounded-2xl fixed bottom-[10%] right-[5%]  grid place-items-center"><RiUserCommunityLine size={30} className="" /></span> : null : null
                }


                <BottomBar parentRef={parentRef} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            </div>
        </CartProvider>

    )
}

export default Home
