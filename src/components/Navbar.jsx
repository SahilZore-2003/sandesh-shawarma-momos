import { useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className='flex items-center justify-between mb-4 border-b border-border pb-2'>
            <h1 className="text-xl font-semibold text-primary">Sandesh S&M</h1>
            <HiOutlineBars3BottomRight
                className="font-bold cursor-pointer"
                size={25}
                onClick={() => setShowLinks(true)}
            />

            {/* Overlay */}
            <div
                onClick={() => setShowLinks(false)}
                className={`fixed inset-0 z-[100000] bg-black/40 ${showLinks ? "visible" : "invisible"}`}
            >
                {/* Sidebar */}
                <div
                    className={`absolute right-0 p-4 py-8  bg-white min-w-[60%] top-0 h-full flex flex-col gap-4 text-base text-primaryText font-bold transform transition-transform duration-300 ease-in-out ${showLinks ? "translate-x-0" : "translate-x-full"}`}
                >
                    <Link to="#">Home</Link>
                    <Link to="#">About Us</Link>
                    <Link to="#">Contact Us</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
