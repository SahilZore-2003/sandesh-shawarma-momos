import { useEffect, useState } from "react"
import Image from "../Image"
import { useCart } from "@context/cartContext"
import itemsData from "../../Data";


const Items = ({ tab, setShowItem, setSelectedItem }) => {
    const selectedFilterIndex = tab.findIndex(item => item?.selected)
    const [filterData, setFilterData] = useState(itemsData);
    const { cart } = useCart()

    useEffect(() => {
        const categoryMap = {
            1: "shawarma",
            2: "veg momos",
            3: "non-veg momos",
        };

        const selectedCategory = categoryMap[selectedFilterIndex];

        let filteredData = [];

        switch (selectedCategory) {
            case categoryMap[1]:
                filteredData = itemsData.filter(item => item?.category === selectedCategory)
                break;
            case categoryMap[2]:
                filteredData = itemsData.filter(item => item.veg && item?.category === "momos")
                break;
            case categoryMap[3]:
                filteredData = itemsData.filter(item => !item.veg && item?.category === "momos")
                break;

            default:
                filteredData = itemsData;

        }



        setFilterData(filteredData);
    }, [selectedFilterIndex, itemsData, cart]);




    return (
        <div>
            <div className="grid grid-cols-2 pb-16 gap-6">
                {
                    filterData.map(({ name, image, pricing, category }, index) => (
                        <div onClick={() => {
                            setShowItem(true);
                            setSelectedItem(itemsData?.find(item => item.name === name))
                        }} key={index} className="flex flex-col gap-1 border-2  pb-3 rounded-md">
                            <Image src={image} />
                            <div className="flex flex-col items-center gap-1">
                                <p className="mt-1  text-center text-secondaryText">{name}</p>
                                <h2 className="text-center text-secondaryText text-2xl">{category === "momos" ? pricing.half : pricing["with-cabbage"]} Rs.</h2>
                            </div>
                        </div>
                    ))
                }


            </div>

            <div className="text-sm text-center text-inputPrimary">No Items Availabel !!</div>
        </div>
    )
}

export default Items
