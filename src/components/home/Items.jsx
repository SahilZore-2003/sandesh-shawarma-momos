import { useContext, useEffect, useState } from "react"
import item1 from "@images/item1.png"
import item2 from "@images/item2.png"
import item3 from "@images/item3.png"
import item4 from "@images/item4.png"
import Image from "../Image"
import { useCart } from "@context/cartContext"


const itemsData = [
    {
        image: item1,
        name: "Chicken Shorama",
        price: "80",
        category: "shorama",
        addedToCart: false
    },
    {
        image: item2,
        name: "Chicken Momos",
        price: "100",
        category: "momos",
        addedToCart: false
    },
    {
        image: item3,
        name: "Peri Peri Momos",
        price: "120",
        category: "momos",
        addedToCart: false
    },
    {
        image: item4,
        name: "Paneer Shorama",
        price: "60",
        category: "shorama",
        addedToCart: false
    },
]
const Items = ({ tab }) => {
    const selectedFilterIndex = tab.findIndex(item => item?.selected)
    const [filterData, setFilterData] = useState(itemsData);
    const { handleAddToCart, cart } = useCart()

    useEffect(() => {
        const categoryMap = {
            1: "shorama",
            2: "momos",
        };
    
        const selectedCategory = categoryMap[selectedFilterIndex];
        const filteredData = selectedCategory
            ? itemsData.filter(item => item.category === selectedCategory)
            : itemsData;
    
        const finalData = filteredData.map(item => {
            const isPresentInCart = cart?.find(cartItem => cartItem.name === item.name);
            return { ...item, addedToCart: !!isPresentInCart };
        });
    
        setFilterData(finalData);
    }, [selectedFilterIndex, itemsData, cart]);
    

    const handleDisabledAddToCart = name => {
        const index = itemsData.findIndex(item => item.name === name)
        if (index !== -1) {
            const newItems = [...itemsData];
            newItems[index].addedToCart = true;
            setFilterData(newItems)
        }
    }

    return (
        <div className="grid grid-cols-2 gap-6">
            {
                filterData.map(({ name, image, price, category, addedToCart }, index) => (
                    <div key={index} className="flex flex-col gap-1 border-2  pb-3 rounded-md">
                        <Image src={image} />
                        <div className="flex flex-col items-center gap-1">
                            <p className="mt-1  text-center text-secondaryText">{name}</p>
                            <h2 className="text-center text-secondaryText text-2xl">{price} Rs.</h2>
                            <button disabled={addedToCart} onClick={() => {
                                handleAddToCart({ name, image, price, category });
                                handleDisabledAddToCart(name)
                            }} className="bg-primary disabled:pointer-events-none disabled:opacity-30 rounded-sm w-[80%]  text-white p-2 px-4">Add to cart</button>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default Items
