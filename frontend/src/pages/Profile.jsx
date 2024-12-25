import { useNavigate } from "react-router-dom"
import { RiLogoutCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useToast } from "../hooks/use-toast"
import Loader from "../loaders/Loader";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { MdOutlineMobileFriendly } from "react-icons/md";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const city = [
    {
        value: "Ambegaon",
        label: "Ambegaon",
    },
    {
        value: "Dhayari",
        label: "Dhayari",
    },
    {
        value: "Waraje",
        label: "Waraje",
    },
    {
        value: "Katraj",
        label: "Katraj",
    },
    {
        value: "Narhegaon",
        label: "Narhegaon",
    },
]

const Profile = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        localStorage.setItem('user', null)
        localStorage.setItem('address', null)
        navigate("/login")
    }
    let userId = localStorage?.getItem('user')

    if (userId) {
        userId = JSON.parse(userId).uid;
    }
    const [disabled, setDisabled] = useState(false);

    const [open, setOpen] = useState(false)
    const [selectedCity, setSelectedCity] = useState(null)

    const handleFetchUserAddress = async () => {
        try {
            setLoading(true)
            if (!userId) {
                toast({
                    title: `Can't find user with ${userId}`,
                    description: "please login again",
                    className: "bg-green-400 text-white",
                });
                return null;
            }
            const docRef = doc(db, "addresses", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const addressData = docSnap.data();
                setUserData(addressData)
                setSelectedCity(addressData?.city || null)
                localStorage.setItem('address', JSON.stringify(addressData))
            } else {
                console.log(`No address data found for userId: ${userId}`);
                return null;
            }
        } catch (error) {
            console.log(error)
            toast({
                title: `Can't find user with ${userId}`,
                description: "please login again",
                className: "bg-green-400 text-white",
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchUserAddress()
    }, [])


    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        area: "",
        building: "",
        landmark: ""
    });

    const [errors, setErrors] = useState({});

    const handleSaveAddress = async () => {
        if (!userId) {
            toast({
                title: "Missing information",
                description: "User ID or address data is missing. Please check and try again.",
                className: "bg-red-400 text-white",
            });
            return;
        }

        try {
            setLoading(true);
            const docRef = doc(db, "addresses", userId);
            await setDoc(docRef, { ...userData, city: selectedCity });
            localStorage.setItem('address', JSON.stringify({ ...userData, city: selectedCity }))
            toast({
                title: "Address saved successfully",
                description: "Now you can order food anytime!",
                className: "bg-green-400 text-white",
            });
        } catch (error) {
            console.error("Error saving address:", error);

            toast({
                title: `Error saving address`,
                description: "Please try again later or re-login.",
                className: "bg-red-400 text-white",
            });
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (userData?.name) {
            const hasNumbers = /\d/; // Regular expression to check for digits
            if (hasNumbers.test(userData.name)) {
                setErrors(prev => ({ ...prev, name: "name cannot contain numbers" }));
                setDisabled(true)
            } else {
                setErrors(prev => ({ ...prev, name: "" }))
                setDisabled(false)
            }
        }

        if (userData?.phone) {
            const isValidPhone = /^\d{10}$/; // Regular expression to check for exactly 10 digits
            if (!isValidPhone.test(userData.phone)) {
                setErrors(prev => ({ ...prev, phone: "Phone number must be exactly 10 digits" }));
                setDisabled(true)
            } else {
                setErrors(prev => ({ ...prev, phone: "" }));
                setDisabled(false)
            }
        }

        if (selectedCity === "" || userData.building === "" || userData?.area === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
        }



    }, [
        userData?.name,
        userData?.phone,
        userData?.building,
        userData?.area,
        selectedCity

    ])


    return (
        <div className='min-h-[calc(100vh-92px)]   text-xl px-4 relative'>
            {
                loading && (
                    <div className="absolute h-[calc(100vh-92px)] top-0 left-0 w-full grid place-items-center bg-white z-[1000]">
                        <Loader size={50} />
                    </div>
                )
            }

            <div className="flex items-center justify-between ">
                <h1 className="font-bold ">My Profile</h1>
                <button onClick={handleLogout} className="bg-primary flex items-center gap-2 text-white p-2 px-4 text-lg rounded-sm">Logout
                    <RiLogoutCircleLine size={25} className="font-bold" />
                </button>
            </div>
            {/* profile info start from here  */}
            <div className="my-4 space-y-4">
                {/* name field  */}
                <div>
                    <label htmlFor="email" className="text-inputSecondary text-sm flex items-center gap-1"><HiOutlineMail size={12} />Your Name</label>
                    <div className="w-full mt-2 border-border border rounded-lg p-2 flex flex-col">
                        <input type="text" name="name" onChange={(e) => {
                            setUserData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} value={userData?.name} placeholder="Enter your name" className="border-0 outline-0 text-base" />
                    </div>
                    {errors?.name?.length > 0 &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">{errors?.name}*</small>}
                </div>

                {/* phone field  */}
                <div>
                    <label htmlFor="phone" className="text-inputSecondary text-sm flex items-center gap-1"><MdOutlineMobileFriendly size={12} />Your phone</label>
                    <div className="w-full mt-2 border-border border rounded-lg p-2 flex flex-col">
                        <input type="tel" maxLength={10} name="phone" onChange={(e) => {
                            setUserData(prev => ({
                                ...prev,
                                phone: e.target.value.replace(/\D/g, "")
                            }));
                        }} value={userData?.phone} placeholder="Enter your phone" className="border-0 outline-0 text-base" />
                    </div>
                    {errors?.phone?.length > 0 &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">{errors?.phone}*</small>}
                </div>

                {/* City field  */}
                <div>
                    <label htmlFor="city" className="text-inputSecondary text-sm flex items-center gap-1"><MdOutlineMobileFriendly size={12} />Your City</label>
                    <div className="flex items-center space-x-4 mt-2">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {selectedCity ? <>{selectedCity.label}</> : <>Select City</>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="start" align="start">
                                <Command>
                                    <CommandInput placeholder="Change status..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {city.map((status) => (
                                                <CommandItem
                                                    key={status.value}
                                                    value={status.value}
                                                    onSelect={(value) => {
                                                        setSelectedCity(
                                                            city.find((priority) => priority.value === value) ||
                                                            null
                                                        )
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {status.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {!selectedCity &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">please select city name please*</small>}
                </div>

                {/* Area field  */}
                <div>
                    <label htmlFor="area" className="text-inputSecondary text-sm flex items-center gap-1"><HiOutlineMail size={12} />Your Area</label>
                    <div className="w-full mt-2 border-border border rounded-lg p-2 flex flex-col">
                        <input type="text" name="area" onChange={(e) => {
                            setUserData(prev => ({
                                ...prev,
                                area: e.target.value
                            }))
                        }} value={userData?.area} placeholder="Enter your area" className="border-0 outline-0 text-base" />
                    </div>
                    {errors?.area?.length > 0 &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">{errors?.area}*</small>}
                </div>

                {/* Buildibg Name  */}
                <div>
                    <label htmlFor="area" className="text-inputSecondary text-sm flex items-center gap-1"><HiOutlineMail size={12} />Your Building Name</label>
                    <div className="w-full mt-2 border-border border rounded-lg p-2 flex flex-col">
                        <input type="text" name="building" onChange={(e) => {
                            setUserData(prev => ({
                                ...prev,
                                building: e.target.value
                            }))
                        }} value={userData?.building} placeholder="Enter your building" className="border-0 outline-0 text-base" />
                    </div>
                    {userData?.building === "" &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">building name or house name can not be empty *</small>}
                </div>

                {/*  LandMark  */}
                <div>
                    <label htmlFor="area" className="text-inputSecondary text-sm flex items-center gap-1"><HiOutlineMail size={12} />Landmark</label>
                    <div className="w-full mt-2 border-border border rounded-lg p-2 flex flex-col">
                        <input type="text" name="landmark" onChange={(e) => {
                            setUserData(prev => ({
                                ...prev,
                                landmark: e.target.value
                            }))
                        }} value={userData?.landmark} placeholder="Enter your landmark" className="border-0 outline-0 text-base" />
                    </div>
                    {/* {userData?.building === "" &&
                        <small className="text-red-500 font-normal inline-block text-xs relative left-[2%]">building name or house name can't be empty *</small>} */}
                </div>

                <Button disabled={disabled} onClick={handleSaveAddress} className={`bg-primary text-white w-full p-2 disabled:opacity-50 disabled:pointer-events-none`}>Save Address</Button>

            </div>
        </div>
    )
}



export default Profile

