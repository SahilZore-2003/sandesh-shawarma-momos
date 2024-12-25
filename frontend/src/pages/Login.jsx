import { useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import { LuCircleUserRound } from "react-icons/lu";
import { doSignInWithEmailAndPassword, doSignInWithGoogle, resetPasswordWithEmail } from "../firebase/auth"
import Loader from '../loaders/Loader';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { FcGoogle } from 'react-icons/fc';


const Login = () => {
    const [errors, setErrors] = useState({
        "email": "",
        "password": ""
    });
    const navigate = useNavigate()
    const { setCurrentUser
    } = useAuth()

    const [userData, setUserData] = useState({
        "email": "",
        "password": ""
    });

    const { toast } = useToast()

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = event => {
        const { value, name } = event.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSigninWithGoogle = async () => {
        try {
            const result = await doSignInWithGoogle()
            setCurrentUser(result)
        } catch (error) {
            console.log(error)
        }

    }

    const handleValidateData = () => {
        const error = {
            "email": "",
            "password": ""
        };
        if (!userData?.password?.trim()) {
            error.password = "Please enter a valid password";
        } else if (userData.password.trim().length < 8) {
            error.password = "Password must be at least 8 characters long";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
            error.password = "Password must include at least one special character";
        } else if (!/\d/.test(userData.password)) {
            error.password = "Password must include at least one number";
        }
        // Email validation
        if (!userData.email?.trim()) {
            error.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            error.email = "Email is not valid";
        }
        setErrors(error)
        return Object.values(error).every(value => value === "");
    };

    const handleLoginUser = async () => {
        const validate = handleValidateData();
        console.log("🚀 ~ handleRegisterUser ~ validate:", validate)
        if (!validate) {
            return toast({
                title: "Please fill correct information..",
                description: "",
                className: "bg-red-400 text-white "
            })
        }
        try {
            setLoading(true)
            const userCredentials = await doSignInWithEmailAndPassword(userData.email, userData.password)
            localStorage.setItem("user", JSON.stringify(userCredentials?.user))
            toast({
                title: "Login Successfully",
                description: "thanks for showing trust on me!!",
                className: "bg-green-400 text-white z-[10000]"
            })
            navigate("/")

        } catch (error) {
            console.log(error)
            toast({
                title: "Login Failed",
                description: "incorrect email or password",
                className: "bg-red-400 text-white z-[10000]"
            })
        } finally {
            setLoading(false)
        }


    }

    const handleForgotPassword = async () => {
        if (userData.email.trim() === "") {
            return setErrors({ email: "please enter valid email" })
        }

        const response = await resetPasswordWithEmail(userData?.email)
        console.log("🚀 ~ handleForgotPassword ~ response:", response)


        toast({
            title: `"Link sent to ${userData?.email} email"`,
            description: "please very and reset your password",
            className: "bg-green-400 text-white "
        })
    }



    return (
        <div className='min-h-screen grid place-items-center'>
            <div className="my-4 space-y-4 p-4 w-full">
                <h1 className='text-2xl text-primaryText font-semibold'>Login Here 😋</h1>
                {/* email field  */}
                <div>
                    <div className="w-full border-border border rounded-lg p-2 flex flex-col">
                        <label htmlFor="email" className="text-inputSecondary text-xs flex items-center gap-1"><HiOutlineMail size={12} />Your Email</label>
                        <input type="text" name="email" onChange={handleChange} value={userData?.email} placeholder="Enter your email" className="border-0 outline-0 text-base" />
                    </div>
                    {errors.email.length > 0 &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">{errors.email}*</small>}
                </div>
                {/* password  */}
                <div>
                    <div className="w-full border-border border rounded-lg p-2 flex flex-col">
                        <label htmlFor="name" className="text-inputSecondary text-xs flex items-center gap-1"><LuCircleUserRound size={12} /> Your Password</label>
                        <div className='flex gap-2 item-center cursor-pointer'>
                            <input value={userData?.password} type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Enter your password" className="border-0 outline-0 text-base grow" />
                            <div onClick={() => setShowPassword(!showPassword)} className='grid place-items-center'>
                                {

                                    !showPassword ? <GoEye size={20} className='text-primary' /> : <GoEyeClosed size={20} className='text-inputSecondary cursor-pointer' />
                                }

                            </div>

                        </div>
                    </div>
                    {
                        errors?.password?.length > 0 && <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">{errors.password}*</small>
                    }

                </div>

                <span onClick={handleForgotPassword} className='text-red-400 text-sm cursor-pointer font-semibold hover:underline inline-block'>Forgot Password ?</span>
                <button onClick={handleLoginUser} className={`w-full flex items-center justify-center gap-2 bg-primary text-white p-2 rounded-md hover:opacity-50 transition-opacity duration-200 ${loading ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100"}`}>
                    {
                        loading ? <div className='flex items-center gap-2'>
                            <Loader size={15} />
                            Loading..
                        </div> : "Login"
                    }
                </button>

                <button onClick={handleSigninWithGoogle} className='w-full border-2 border-primary rounded-md text-primary p-2 flex items-center justify-center'><FcGoogle size={20} className='mx-2' /> Login with google</button>
            </div>
        </div>
    )
}

export default Login
