import { FaCircleXmark } from "react-icons/fa6"
import Image from "../Image"
import FoodType from "../FoodType"
import { GiCabbage } from "react-icons/gi"
import { PiCheeseBold, PiCheeseFill } from "react-icons/pi"
import { useContext, useEffect, useState } from "react"
import { Checkmark } from "react-checkmark"
import { useCart } from "@context/cartContext"
const shawarmaTypes = [
    {
        type: "with-cabbage",
        icon: <GiCabbage />,
        price: "60"
    },
    {
        type: "without-cabbage",
        icon: <GiCabbage />,
        price: "80"
    },
    {
        type: "with-cabbage-cheese",
        icon: <div className="relative"><GiCabbage className="relative -translate-x-[30%]" /><PiCheeseFill className="absolute top-0 left-[30%]" /></div>,
        price: "80"
    },
    {
        type: "without-cabbage-cheese",
        icon: <div className="relative"><GiCabbage className="relative -translate-x-[30%]" /><PiCheeseFill className="absolute top-0 left-[30%]" /></div>,
        price: "100"
    },
]
const ShowItem = ({
    showItem, setShowItem, selectedItem
}) => {
    const [selectedType, setSelectedType] = useState(0);
    const { image, name } = selectedItem || { image: "", name: "", price: "", category: "" }
    const { handleAddToCart } = useCart()
    const [addToCart, setAddToCart] = useState(false);
    const handleAddedToCart = () => {
        setAddToCart(true);
        handleAddToCart({
            ...selectedItem,
            name: `${selectedItem.name}:${shawarmaTypes[selectedType].type}`,
            price: `${shawarmaTypes[selectedType].price}`,
        })
    }

    useEffect(() => {
        setAddToCart(false)
    }, [selectedItem, selectedType])




    return (
        <div className={`text-2xl hide-scrollbar  absolute  z-[100] left-0 w-full h-full min-h-[calc(100vh-57px)] overflow-y-scroll pb-24  border-2  bg-white transition-all  duration-500 ${showItem ? "top-[0%] visible  h-full overflow-auto" : "top-full invisible h-0 overflow-hidden"}`}>
            <FaCircleXmark onClick={() => {
                setShowItem(false)
            }} size={40} className="absolute z-[100] right-[5%] top-[3%] fill-primary" />
            {/* main content start from here  */}
            <div className=" bg-white">
                <div className="">
                    <Image src={image} className={"aspect-video"} />
                </div>

                {/* type selection  */}
                <div className="flex items-center flex-wrap justify-between my-4   px-4">
                    {
                        shawarmaTypes?.map((item, index) => (
                            <div onClick={() => {
                                setSelectedType(index)
                            }} key={index} className={` basis-[22%] text-4xl border-2 p-2 2  rounded-md ${selectedType === index ? "border-primary bg-primary text-white" : "text-primary bg-white border-border"}`}>
                                <div className="flex flex-col items-center gap-1">
                                    <small className="text-xs">
                                        {
                                            index % 2 === 0 ? "with" : "with-out"
                                        }
                                    </small>
                                    {item.icon}
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="p-4">
                    <div className="relative">
                        <h2 className="font-bold text-xl">{name}</h2>
                        <h1 className="text-secondaryText text-2xl font-bold"> {shawarmaTypes[selectedType].price} rs.</h1>
                        <p className="text-lg text-inputPrimary">{shawarmaTypes[selectedType].type.replaceAll("-", "  ")}</p>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <FoodType type="non-veg" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center  w-full justify-center" onClick={handleAddedToCart}>
                    <button className={`  border-primary border-2 flex items-center justify-center  text-xl w-[90%] rounded-md p-2 ${addToCart ? "bg-white text-primary opacity-60 pointer-events-none" : "bg-primary text-white pointer-events-auto opacity-100"}`}>
                        {
                            addToCart ? <span className="text-primary text-xl flex items-center gap-2 justify-center"><Checkmark color={"#6fcf97"} size={30} />Added to Cart</span> : <span>Add to cart</span>
                        }


                    </button>

                </div>
            </div>
        </div>
    )
}

export default ShowItem
