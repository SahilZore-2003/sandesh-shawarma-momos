import { useState } from "react";
import BottomBar from "../components/BottomBar";
import HomeContent from "../components/home/HomeContent";
import Cart from "./Cart";
import Orders from "./Orders";
import Profile from "./Profile";
const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const components = [
        HomeContent,
        Orders,
        Profile,
        Cart,
    ]
    return (
        <div className="flex flex-col  h-screen">
            <div className=" text-sm pb-[40px] grow   w-full p-2 h-full overflow-y-scroll">

                {components[activeIndex]()}



            </div>
            <BottomBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </div>
    )
}

export default Home
