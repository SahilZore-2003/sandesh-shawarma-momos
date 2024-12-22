import { useState } from 'react';
import { useRef } from 'react';
import { MdOutlineInstallMobile } from "react-icons/md";
import { RiMobileDownloadLine } from "react-icons/ri";
import logo from "../../../public/favicon.png"

const TopBanner = () => {
    const [hidePromo, setHidePromo] = useState(false);
    const promoRef = useRef()

    function downloadApp() {
        // Check if the browser supports the PWA functionality
        if (downloadAppRef?.current) {
            downloadAppRef.current.innerText = "Downloading started.."
            downloadAppRef.current.disabled = true;
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(function (registration) {
                // Check if an existing web app manifest exists
                if (!registration.active.scriptURL.includes('manifest.json')) {
                    // Create a new manifest file (you might need to adjust the path)
                    const manifestData = {
                        "short_name": "Sandesh S&M",
                        "name": "Sandesh showrama & momos",
                        "icons": [
                            // Define app icons with different sizes
                            {
                                "src": logo,
                                "sizes": "192x192",
                                "type": "image/png"
                            },
                            {
                                "src": logo,
                                "sizes": "512x512",
                                "type": "image/png"
                            }
                        ],
                        "start_url": "/", // The starting URL of your app
                        "display": "standalone" // Display mode (standalone, fullscreen, minimal-ui)
                    };

                    // Create a Blob with the manifest data
                    const blob = new Blob([JSON.stringify(manifestData)], { type: 'application/json' });

                    // Create a URL for the Blob
                    const manifestURL = URL.createObjectURL(blob);

                    // Update the service worker with the new manifest
                    registration.updateWithNewContent({
                        urls: [manifestURL]
                    });

                    // Revoke the object URL to release resources
                    URL.revokeObjectURL(manifestURL);
                }

                // Prompt the user to add the app to the home screen
                if (window.deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the A2HS prompt');
                        } else {
                            console.log('User dismissed the A2HS prompt');
                        }
                        deferredPrompt = null;
                    });
                }
            });
        }
    }

    const downloadAppRef = useRef()



    return (
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
    )
}

export default TopBanner
