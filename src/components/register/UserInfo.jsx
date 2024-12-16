import { useEffect, useState } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import { LuCircleUserRound } from "react-icons/lu";
import { MdOutlinePhonelinkRing } from 'react-icons/md';
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth"
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const UserInfo = () => {
    const [errors, setErrors] = useState({
        "email": "",
        "name": "",
        "phone": "",
        "password": ""
    });

    const [userData, setUserData] = useState({
        "email": "",
        "name": "",
        "phone": "",
        "password": ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = event => {
        const { value, name } = event.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleValidateData = () => {
        const error = {
            "email": "",
            "name": "",
            "phone": "",
            "password": ""
        };

        if (userData?.name?.trim() === "") {
            error.name = "Please enter your name";
        }

        if (!userData?.password?.trim()) {
            error.password = "Please enter a valid password";
        } else if (userData.password.trim().length < 8) {
            error.password = "Password must be at least 8 characters long";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)) {
            error.password = "Password must include at least one special character";
        } else if (!/\d/.test(userData.password)) {
            error.password = "Password must include at least one number";
        }

        if (!/^[a-zA-Z\s]+$/.test(userData?.name)) {
            error.name = "Name must only contain alphabets and spaces";
        }

        if (!/^\d{10}$/.test(userData?.phone)) {
            error.phone = "Phone number must be 10 digits";
        }

        // Email validation
        if (!userData.email?.trim()) {
            error.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            error.email = "Email is not valid";
        }

        return setErrors(error);
    };

    const handleRegisterUser = async () => {
        handleValidateData();
        try {
            const userCredentials = await doCreateUserWithEmailAndPassword(userData.email, userData.password)
            console.log("🚀 ~ handleRegisterUser ~ userCredentials:", userCredentials)


        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className="my-4 space-y-4">
            {/* name field  */}
            <div>
                <div className="w-full border-border border rounded-lg p-2 flex flex-col">
                    <label htmlFor="name" className="text-inputSecondary text-xs flex items-center gap-1"><LuCircleUserRound size={12} /> Your name</label>
                    <input value={userData?.name} type="text" name="name" onChange={handleChange} placeholder="Enter your name" className="border-0 outline-0 text-base" />
                </div>
                {
                    errors.name.length > 0 && <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">name is not valid*</small>
                }

            </div>
            {/* email field  */}
            <div>
                <div className="w-full border-border border rounded-lg p-2 flex flex-col">
                    <label htmlFor="email" className="text-inputSecondary text-xs flex items-center gap-1"><HiOutlineMail size={12} />Your Email</label>
                    <input type="text" name="email" onChange={handleChange} value={userData?.email} placeholder="Enter your email" className="border-0 outline-0 text-base" />
                </div>
                {errors.email.length > 0 &&
                    <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">Email is not valid*</small>}
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
                    errors.password.length > 0 && <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">Password is not valid*</small>
                }

            </div>

            {/* 
                name field 
           

                phone field 
            <div>
                <div className="w-full border-border border rounded-lg p-2 flex flex-col">
                    <label htmlFor="email" className="text-inputSecondary text-xs flex items-center gap-1"><MdOutlinePhonelinkRing size={15} /> Your Phone</label>
                    <input type="tel" onChange={handleChange} name="phone" value={userData?.phone} id="" placeholder="Enter your Phone Number" className="border-0 outline-0 text-base" />
                </div>
                {errors.phone.length > 0 && <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">Phone is not valid*</small>}
            </div> */}

            <button onClick={handleRegisterUser} className="w-full bg-primary text-white p-2 rounded-md hover:opacity-50 transition-opacity duration-200">Register Now</button>

        </div>
    )
}

export default UserInfo
