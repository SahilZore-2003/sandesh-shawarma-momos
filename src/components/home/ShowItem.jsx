import { FaCircleXmark } from "react-icons/fa6"
import Image from "../Image"
import FoodType from "../FoodType"
import { GiCabbage } from "react-icons/gi"
import { PiCheeseBold, PiCheeseFill } from "react-icons/pi"

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
        icon: <PiCheeseFill />,
        price: "80"
    },
    {
        type: "with-cabbage-cheese",
        icon: <PiCheeseBold  />,
        price: "100"
    },
]
const ShowItem = ({
    showItem, setShowItem, selectedItem
}) => {

    const { image, name, price } = selectedItem || { image: "", name: "", price: "", category: "" }


    return (
        <div className={`text-2xl hide-scrollbar  absolute  z-[100] left-0 w-full h-full overflow-y-scroll pb-24  border-2  bg-white transition-all duration-500 ${showItem ? "top-[0%] visible  h-full overflow-auto" : "top-full invisible h-0 overflow-hidden"}`}>
            <FaCircleXmark onClick={() => {
                setShowItem(false)
            }} size={40} className="absolute z-[100] right-[5%] top-[3%] fill-primary" />
            {/* main content start from here  */}
            <div className="">
                <div className="">
                    <Image src={image} className={"aspect-video"} />
                </div>
                <div className="p-4">
                    <div className="relative">
                        <h2 className="font-bold text-xl">{name}</h2>
                        <h1 className="text-secondaryText text-xl font-bold"> {price} rs.</h1>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <FoodType type="non-veg" />
                        </div>
                    </div>
                </div>
                {/* type selection  */}
                <div className="flex items-center flex-wrap gap-2 px-4">
                    {
                        shawarmaTypes?.map((item, index) => (
                            <div key={index} className="text-primary text-4xl border-2 p-2 border-border rounded-md" >
                                {item.icon}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ShowItem
