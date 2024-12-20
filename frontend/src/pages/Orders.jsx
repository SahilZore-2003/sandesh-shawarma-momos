import { FaRegFaceSmileBeam } from "react-icons/fa6"

const Orders = () => {
    return (
        <div className="grid place-items-center min-h-[70vh]">
            <div className='flex flex-col items-center gap-4 text-primary'>
                <h1 className="text-center w-full text-2xl">Thanks for Order food we deliver your order soon...</h1>
                <FaRegFaceSmileBeam size={80} />
            </div>
        </div>
    )
}

export default Orders