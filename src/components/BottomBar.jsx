/* eslint-disable react/prop-types */
import Beacon from "./Beacon"
import { BsCart } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { LuListCheck } from 'react-icons/lu'

const BottomBar = ({
    activeIndex, setActiveIndex
}) => {

    const tabs = [
        {
            icon: <IoHomeOutline />,
            name: "Home"
        },
        {
            icon: <LuListCheck />,
            name: "Orders",
        },
        {
            icon: <FaRegUser />,
            name: "Profile"
        },
        {
            icon: <BsCart />,
            name: "Cart"
        },
    ];

    // Calculate left position based on active tab index
    const indicatorPosition = `${activeIndex * 25}%`;
    return (
        <div className='flex bg-white items-center justify-between relative w-full z-[1000] text-black border-t border-gray-300 pt-1'>
            {
                tabs.map((item, index) => (
                    <div
                        onClick={() => { setActiveIndex(index) }}
                        key={index}
                        className={`flex cursor-pointer select-none flex-col relative items-center p-2 w-[25%] ${activeIndex === index ? "text-primary" : "text-black"}`}
                    >
                        <span className='inline-block text-xl'>
                            {item.icon}
                        </span>
                        <small className='text-xs'>{item.name}</small>
                        {index === tabs.length - 1 && <Beacon count={index} />}
                    </div>
                ))
            }
            {/* Moving Indicator */}
            <span
                className="absolute bottom-0 left-0 transition-all duration-300 w-[25%] h-[10%] flex items-center justify-center"
                style={{ left: indicatorPosition }} // Dynamic left position
            >
                <span className='w-[70%] h-full bg-primary rounded-full rounded-br-none rounded-bl-none'>
                </span>
            </span>
        </div>
    );
};

export default BottomBar;
