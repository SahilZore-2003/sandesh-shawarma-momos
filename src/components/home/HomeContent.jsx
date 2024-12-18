import { useRef, useState } from "react";
import banner from "../../../public/banner.png"
import { MdBorderAll } from "react-icons/md";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { FaBowlFood, FaXmark } from "react-icons/fa6";
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

    const [hidePromo, setHidePromo] = useState(false);
    const promoRef = useRef()

    return (
        <div className=''>
            {/* top banner  */}
            <div ref={promoRef} className={`rounded-md bg-[#4fae5b]   text-white flex p-4 items-center justify-between transition-all duration-1000 gap-4 relative ${hidePromo ? "-translate-y-[200%] opacity-50" : "translate-y-0"}`}>
                <FaXmark onClick={() => {
                    setHidePromo(true);
                    setTimeout(() => promoRef.current.style.display = "none", 500)
                }} className="text-black text-2xl absolute top-[5%] right-[2%]" />
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
