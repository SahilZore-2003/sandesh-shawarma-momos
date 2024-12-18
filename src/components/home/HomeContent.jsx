import { useRef, useState } from "react";
import { MdBorderAll } from "react-icons/md";
import { TbBrandWindowsFilled } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { FaBowlFood, FaXmark } from "react-icons/fa6";
import HomeTab from "./HomeTab";
import TopBanner from "./TopBanner";

import Items from "./Items";
import ShowItem from "./ShowItem";
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
    const [showItem, setShowItem] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    return (
        <div className=''>
            {/* top banner  */}
            <TopBanner />
            {/* tabs  */}
            <HomeTab
                tab={tab}
                setTab={setTab}
            />
            {/* Home Items  */}
            <Items
                tab={tab}
                setShowItem={setShowItem}
                setSelectedItem={setSelectedItem}
            />

            {/* showitem tab  */}
            <ShowItem
                selectedItem={selectedItem}
                showItem={showItem}
                setShowItem={setShowItem} />
        </div>
    )
}

export default HomeContent
