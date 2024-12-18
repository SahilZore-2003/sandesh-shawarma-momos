import { useEffect, useState } from "react"
import item1 from "../../../public/item1.png"
import item2 from "../../../public/item2.png"
import item3 from "../../../public/item3.png"
import item4 from "../../../public/item4.png"

const itemsData = [
    {
        image: item1,
        name: "Chicken Shorama",
        price: "80",
        category: "shorama"
    },
    {
        image: item2,
        name: "Chicken Momos",
        price: "100",
        category: "momos"
    },
    {
        image: item3,
        name: "Peri Peri Momos",
        price: "120",
        category: "momos"
    },
    {
        image: item4,
        name: "Paneer Shorama",
        price: "60",
        category: "shorama"
    },
]
const Items = ({ tab }) => {
    const selectedFilterIndex = tab.findIndex(item => item?.selected)
    const [filterData, setFilterData] = useState(itemsData);


    useEffect(() => {
        const categoryMap = {
            1: "shorama",
            2: "momos",
        };

        const selectedCategory = categoryMap[selectedFilterIndex];
        const filteredData = selectedCategory
            ? itemsData.filter(item => item.category === selectedCategory)
            : itemsData;

        setFilterData(filteredData);
    }, [selectedFilterIndex]);

    return (
        <div className="grid grid-cols-2 gap-6">
            {
                filterData.map(({ name, image, price, category }, index) => (
                    <div key={index} className="flex flex-col gap-1 border-2  pb-3 rounded-md">
                        <div className="relative overflow-hidden ">
                            <img src={image} className="relative z-10 aspect-square object-contain" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-green-300 "></div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p className="mt-1  text-center text-secondaryText">{name}</p>
                            <h2 className="text-center text-secondaryText text-2xl">{price} Rs.</h2>
                            <button className="bg-primary rounded-sm w-[80%]  text-white p-2 px-4">Add to cart</button>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default Items
