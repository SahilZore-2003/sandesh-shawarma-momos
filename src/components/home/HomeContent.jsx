import { useState } from "react";
import banner from "../../../public/banner.png"
import { MdBorderAll } from "react-icons/md";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import HomeTab from "./HomeTab";
import itemImage from "../../../public/item1.jpg"
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
            <div className="grid grid-cols-2 gap-4">
                {
                    Array.from({ length: 4 }).map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="relative border-2 border-primary rounded-lg overflow-hidden">
                                <img src={itemImage} className="" alt="" />
                            </div>
                            <p className="mt-1  text-center text-secondaryText">Chicken Shorama</p>
                            <h2 className="text-center text-secondaryText text-2xl">80 Rs.</h2>
                            <button className="bg-primary rounded-full  text-white p-2">Add to cart</button>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default HomeContent
