import { useState } from "react";
import banner from "../../../public/banner.png"
import { MdBorderAll } from "react-icons/md";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import HomeTab from "./HomeTab";

import Items from "./Items";
const HomeContent = () => {
    const [tab, setTab] = useState([
        {
            title: "All",
            icon: TbBrandWindowsFilled,
            selected: true
        },
        {
            title: "Shorama",
            icon: GiChickenOven,
            selected: false
        },
        {
            title: "Momos",
            icon: FaBowlFood,
            selected: false
        }
    ]);



    return (
        <div className=''>
            {/* top banner  */}
            <div className="rounded-md bg-[#4fae5b] text-white flex p-4 items-center justify-between gap-4 relative">
                <div className="relative z-[100] w-[70%]">
                    <h1 className="text-lg font-bold ">Claim Your first Free Order Now</h1>
                    <button className="text-xs  p-2 rounded-full px-4 mt-2 bg-black ">
                        Order Now
                    </button>
                </div>
                <img className="absolute  right-0 h-auto bottom-0 object-cover w-[30%]" src={banner} alt="" />
            </div>
            {/* tabs  */}
            <HomeTab tab={tab} setTab={setTab} />
            {/* Home Items  */}
           <Items tab={tab} />
        </div>
    )
}

export default HomeContent
