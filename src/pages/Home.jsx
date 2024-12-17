import { useEffect, useState } from "react";
import bg from "../../public/background.jpg"
const Home = () => {
    const [showHeading, setShowHeading] = useState(false);

    useEffect(() => {
        setShowHeading(true)
    }, [])
    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "top"
        }} className='h-screen text-center relative  text-2xl bg-white  grid place-items-center'>
            <div className="absolute inset-0 bg-black/90 e text-4xl grid place-items-center text-white">

                <h1 className={`text-red-500 transition-transform duration-500 italic text-4xl font-semibold ${showHeading ? "translate-y-0" : "-translate-y-full"}`}>Comming <br /> <span className="text-white text-xl">Soon....</span> <br /> <span className="text-2xl  text-white inline-block"><span className="text-red-500">चिपळूण</span> कर ...</span> </h1>
            </div>
        </div>
    )
}

export default Home
