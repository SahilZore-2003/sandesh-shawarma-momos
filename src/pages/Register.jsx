
import UserInfo from "../components/register/UserInfo";



const Register = () => {
    return (
        <div className="p-4 my-4">

            {/* <div className="my-6 flex items-center justify-between relative">
                {
                    Array.from({ length: 5 }).map((item, index) => (
                        <div key={index} className="border border-primary font-bold  size-[35px] grid place-items-center text-primary bg-white rounded-md aspect-square relative z-[100] first:bg-primary first:text-white">
                            {index + 1}
                        </div>
                    ))
                }
                <span className="absolute top-1/2 left-0 w-full h-[6%] bg-secondary z-[10]"></span>
            </div> */}
            <h2 className='text-start font-semibold  text-primaryText text-lg'>Register Please First ☺️..</h2>
            <UserInfo />
        </div>
    )
}

export default Register
