import { FaCircleXmark } from "react-icons/fa6"
import Image from "../Image"
import FoodType from "../FoodType"
import { GiCabbage } from "react-icons/gi"
import { PiCheeseFill } from "react-icons/pi"
import { useEffect, useState } from "react"
import { Checkmark } from "react-checkmark"
import { useCart } from "@context/cartContext"
import momos from "@images/momos.svg"
const shawarmaTypes = [
    {
        type: "with-cabbage",
        icon: <GiCabbage />,
    },
    {
        type: "without-cabbage",
        icon: <GiCabbage />,
    },
    {
        type: "with-cabbage-cheese",
        icon: <div className="relative"><GiCabbage className="relative -translate-x-[30%]" /><PiCheeseFill className="absolute top-0 left-[30%]" /></div>,
    },
    {
        type: "without-cabbage-cheese",
        icon: <div className="relative"><GiCabbage className="relative -translate-x-[30%]" /><PiCheeseFill className="absolute top-0 left-[30%]" /></div>,
    },
]

const momosTypes = [
    {
        type: "half",
        icon: momos,
    },
    {
        type: "full",
        icon: momos,
    },
]
const ShowItem = ({
    showItem, setShowItem, selectedItem
}) => {
    const shawarma = ["with-cabbage",
        "without-cabbage",
        "with-cabbage-cheese",
        "without-cabbage-cheese"]
    const momos = ["half",
        "full",
    ]
    const [selectedType, setSelectedType] = useState(0);

    const { handleAddToCart } = useCart()
    const [addToCart, setAddToCart] = useState(false);
    const handleAddedToCart = () => {
        setAddToCart(true);
        handleAddToCart({
            ...selectedItem,
            name: `${selectedItem.name}:${shawarmaTypes[selectedType].type}`,
            price: selectedItem.category === "momos" ? selectedItem.pricing[momos[selectedType]] : selectedItem.pricing[shawarma[selectedType]],
            type: selectedItem.category === "momos" ? momosTypes[selectedType].type : shawarmaTypes[selectedType].type
        })
    }

    useEffect(() => {
        setAddToCart(false)
    }, [selectedItem, selectedType])

    return (
        <div className={`text-2xl hide-scrollbar  absolute  z-[100] left-0 w-full h-full min-h-[calc(100vh-57px)] overflow-y-scroll pb-24  border-2  bg-white transition-all  duration-500 ${showItem ? "top-[0%] visible  h-full overflow-auto" : "top-full invisible h-0 overflow-hidden"}`}>
            <FaCircleXmark onClick={() => {
                setShowItem(false);
                setSelectedType(0)
            }} size={40} className="absolute z-[100] right-[5%] top-[3%] fill-primary" />
            {/* main content start from here  */}
            <div className=" bg-white">
                <div className="">
                    <Image src={selectedItem?.image} className={"aspect-video"} />
                </div>

                {/* type selection  */}
                {
                    selectedItem?.category === "momos" ? <div className="flex items-center flex-wrap justify-start gap-4 my-4   px-4">
                        {
                            momosTypes?.map((item, index) => (
                                <div onClick={() => {
                                    setSelectedType(index)
                                }} key={index} className={` basis-[22%] text-4xl border-2 p-2 2  rounded-md ${selectedType === index ? "border-primary bg-primary text-white" : "text-primary bg-white border-border"}`}>
                                    <div className="flex flex-col items-center gap-1">
                                        <small className="text-xs">
                                            {
                                                index === 0 ? "Half" : "Full"
                                            }
                                        </small>
                                        <img src={item.icon} alt="" />
                                    </div>
                                </div>
                            ))
                        }

                    </div> : <div className="flex items-center flex-wrap justify-between my-4   px-4">
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
                }





                <div className="p-4">
                    <div className="flex gap-4">
                        <div className="grow">
                            <h2 className="font-bold text-xl">{selectedItem?.name}</h2>
                            <h1 className="text-secondaryText text-2xl font-bold"> {selectedItem?.category === "momos" ? selectedItem?.pricing[momos[selectedType]] : selectedItem?.pricing[shawarma[selectedType]]} rs.</h1>
                            <p className="text-lg text-inputPrimary">{selectedItem?.category === "momos" ? `${momos[selectedType]}, ${selectedType ? "10" : "5"} pices` : shawarma[selectedType]}</p>
                        </div>
                        <div className="">
                            <FoodType type={selectedItem?.veg} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center  w-full justify-center" onClick={handleAddedToCart}>
                    <button className={`  border-primary border-2 flex items-center justify-center  text-xl w-[90%] rounded-md p-2 ${addToCart ? "bg-white text-primary opacity-60 pointer-events-none" : "bg-primary text-white pointer-events-auto opacity-100"}`}>
                        {
                            addToCart ? <span className="text-primary text-lg flex items-center gap-2 justify-center"><Checkmark color={"#6fcf97"} size={30} />Added to Cart</span> : <span>Add to cart</span>
                        }


                    </button>

                </div>
            </div>
        </div>
    )
}

export default ShowItem
