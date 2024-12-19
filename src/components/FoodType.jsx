import { FaCircle } from 'react-icons/fa6'

const FoodType = ({ type, size = "lg" }) => {

    const sizes = {
        sm: "p-1 text-sm",
        md: "p-2 text-base",
        lg: "p-2 text-lg"
    }
    return (
        <div className={`inline-block  border-2  ${sizes[size]} rounded-md ${type ? "border-green-400" : "border-red-500"}`}>
            <FaCircle className={` ${type ? "fill-green-400" : "fill-red-500"}`} />
        </div>
    )
}

export default FoodType
