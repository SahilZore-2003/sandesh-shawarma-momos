import banner from "../../../public/banner.png"

const HomeContent = () => {


    return (
        <div className=''>
            <div className="rounded-md bg-[#4fae5b] text-white flex p-4 items-center justify-between gap-4 relative">
                <div className="relative z-[100] w-[70%]">
                    <h1 className="text-lg font-bold ">Claim Your first Free Order Now</h1>
                    <button className="text-xs  p-2 rounded-full px-4 mt-2 bg-black ">
                        Order Now
                    </button>
                </div>
                <img className="absolute  right-0 h-auto bottom-0 object-cover w-[30%]" src={banner} alt="" />
            </div>
        </div>
    )
}

export default HomeContent
