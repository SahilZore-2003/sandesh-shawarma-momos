import { useState } from 'react';
import { useRef } from 'react';
import { MdOutlineInstallMobile } from "react-icons/md";
import { RiMobileDownloadLine } from "react-icons/ri";
import logo from "../../../public/favicon.png"
import DownloadAppSteps from '../DownloadAppSteps';

const TopBanner = () => {
    const [hidePromo, setHidePromo] = useState(false);
    const promoRef = useRef()
    const [showDialog, setShowDialog] = useState(false);

    function downloadApp() {
        // Check if the browser supports the PWA functionality
        setShowDialog(true)
    }

    const downloadAppRef = useRef()



    return (
        <div>
            <div ref={promoRef} className={`rounded-md bg-[#4fae5b]   text-white flex p-4 items-center justify-between transition-all duration-1000 gap-4 relative ${hidePromo ? "-translate-y-[200%] opacity-50" : "translate-y-0"}`}>
                {/* <FaXmark onClick={() => {
                    setHidePromo(true);
                    setTimeout(() => promoRef.current.style.display = "none", 500)
                }} className="text-black text-2xl absolute top-[5%] right-[2%]" /> */}
                <div className="relative z-[100] w-[70%]">
                    <h1 className="text-lg font-bold ">Download Our App</h1>
                    <p className='text-xs '>better experience for our users..</p>
                    <button ref={downloadAppRef} onClick={downloadApp} className="text-xs  p-2 rounded-full disabled:opacity-50 flex items-center gap-2 px-4 mt-2 bg-black ">
                        <RiMobileDownloadLine size={20} /> Download Now
                    </button>
                </div>
                <div className='w-[30%] flex items-center justify-between '>
                    <MdOutlineInstallMobile className='fill-black' size={80} />
                </div>

            </div>
            <DownloadAppSteps showDialog={showDialog} setShowDialog={setShowDialog} />
        </div>
    )
}

export default TopBanner
