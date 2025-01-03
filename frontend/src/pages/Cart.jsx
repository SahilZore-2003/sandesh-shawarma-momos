import { RiDeleteBin6Fill } from "react-icons/ri"
import Image from "../components/Image"
import { FaMinus, FaPencil, FaPlus } from "react-icons/fa6"
import { useCart, } from "@context/cartContext"
import { useRazorpay } from "react-razorpay";
import { useToast } from "../hooks/use-toast"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"
import { useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import success from "../../public/success.mp3"


const Cart = ({ setActiveIndex }) => {
    const { cart, handleIncreaseQnt, handleDecreaseQnt, handleRemoveFromCart, cleanCart } = useCart()
    const total = cart.reduce((sum, item) => {
        return sum + item.quntity * parseFloat(item?.pricing[item?.type]);
    }, 0);
    const { Razorpay } = useRazorpay();
    const { uid, email } = JSON.parse(localStorage.getItem('user'))
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
    const sendMessages = false;
    const [address, setAddress] = useState(null);


    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const generateOrderId = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: total }) // Add the required data
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const response = await res.json()

            return response.id
        } catch (error) {
            console.error("Error:", error.message); // Handle errors
        }

    }

    const paymentHandler = async (response, orderId) => {
        // Payment successful
        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
            order: { ...cart },
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Ensures the time is in 12-hour format with am/pm
            }),
            totalBill: total,
            email: email,
            userid: uid,
            paymentId,
            "orderId": orderId,
            paymentMethod,
        };

        try {
            const orderDocRef = doc(db, 'orders', uid, orderId, orderInfo?.date);
            await setDoc(orderDocRef, { ...orderInfo });
            toast({
                title: "Payment Successful!",
                description: "Your order has been placed.",
                className: "bg-green-400 text-white",
            });
            sendSms()
            setLoading(false)
            cleanCart()
            const audio = document.createElement("audio");
            audio.src = success;
            audio.play()
            setActiveIndex(1)
        } catch (error) {
            console.error("Error storing order:", error);
        }
    }

    const handleCashOnDelivery = async () => {
        const orderId = await generateOrderId()
        const orderInfo = {
            order: { ...cart },
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Ensures the time is in 12-hour format with am/pm
            }),
            totalBill: total,
            orderId: orderId,
            email: email,
            userid: uid,
            paymentMethod,
        };

        try {
            setLoading(true)
            const orderRef = doc(db, "orders", uid);
            await setDoc(
                orderRef,
                {
                    [orderId]: orderInfo
                },
                { merge: true } // Merge ensures it updates only the specific `orderId`
            );

            toast({
                title: "Payment Successful!",
                description: "Your order has been placed.",
                className: "bg-green-400 text-white",
            });
            cleanCart()
            sendSms()
            const audio = document.createElement("audio");
            audio.src = success;
            audio.play()
            setActiveIndex(1)
        } catch (error) {
            console.error("Error storing order:", error);
        } finally {
            setLoading(false)
        }
    }

    const sendSms = async () => {
        if (!sendMessages) {
            console.log("inside sendmessage return ")
            return null
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: `Hello Sahil new order is place now from ${email}. [sandesh Shawarma & Momos]` }) // Add the required data
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const response = await res.json()

            return response
        } catch (error) {
            console.error("Error:", error.message); // Handle errors
        }

    }

    const handlePayment = async () => {
        setLoading(true)
        const orderId = await generateOrderId()
        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            key_secret: import.meta.env.VITE_RAZORPAY_SECRET_KEY,
            amount: total * 100,
            currency: "INR",
            name: "Sahil Zore",
            description: "Test Transaction",
            order_id: orderId,
            handler: (response) => paymentHandler(response, orderId),
            prefill: {
                name: "Sahil Zore",
                email: "zoresahil80@gmail.com",
                contact: "9356089857",
            },
            theme: {
                color: "#6fcf97",
            },
            modal: {
                ondismiss: function () {
                    setLoading(false)
                    toast({
                        title: "Payment Canceled",
                        description: "You Cancel the payment",
                        className: "bg-red-400 text-white",
                    });
                },
            },
        };

        if (paymentMethod === "cash on delivery") {
            handleCashOnDelivery()
        } else {
            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        }

    };

    // const handleFetchUserAddress = async () => {
    //     try {
    //         setLoading(true)
    //         if (!uid) {
    //             toast({
    //                 title: `Can't find user with ${userId}`,
    //                 description: "please login again",
    //                 className: "bg-green-400 text-white",
    //             });
    //             return null;
    //         }
    //         const docRef = doc(db, "addresses", uid);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             const addressData = docSnap.data();
    //             setAddress(addressData)
    //             localStorage.setItem('address', JSON.stringify(addressData))
    //         } else {
    //             console.log(`No address data found for userId: ${userId}`);
    //             return null;
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast({
    //             title: `Can't find user with ${uid}`,
    //             description: "please login again",
    //             className: "bg-red-400 text-white",
    //         });
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    useEffect(() => {
        const address = JSON.parse(localStorage.getItem('address'))
        if (address) {
            return setAddress(address)
        } else {
            setActiveIndex(2)
        }

    }, [])



    return (
        <div className='pb-12  '>
            <h1 className="font-bold text-primaryText text-xl px-4">{
                cart.length ? "Cart Items" : "Cart Is Empty"

            }</h1>
            {
                cart.length > 0 && <div className="my-4 px-4">
                    {
                        cart.map(({ image, category, pricing, quntity, name, type }, index) => (
                            <div key={index} className="flex items-start gap-4 border-b-2 last:border-b-0 pb-2 border-border first:mt-0 mt-2 ">
                                <Image src={image} className={"basis-[30%] shrink-0 rounded-md"} />
                                <div className="grow">
                                    <div className="grow flex gap-2 items-center">
                                        <div className="grow text-xl">
                                            <h2 className="font-semibold text-lg text-primaryText">{name.split(":")[0]}</h2>
                                            <div className="font-normal  text-sm text-inputSecondary">{name.split(":")[1]} </div>
                                            <small className="font-bold text-inputSecondary">{pricing[type]} rs</small>
                                        </div>
                                        <RiDeleteBin6Fill onClick={() => handleRemoveFromCart(name)} size={28} className="fill-secondary hover:fill-primaryText" />
                                    </div>
                                    <div className="flex items-center justify-between gap-2 mt-2">
                                        <div className="flex items-center gap-3 p-2 rounded-full bg-[#f0f0f0] text-lg text-black">
                                            <span onClick={() => handleDecreaseQnt({ image, category, pricing, quntity, name })} className="bg-white aspect-square rounded-full p-2"><FaMinus size={15} /></span>
                                            <span>{quntity}</span>
                                            <span onClick={() => handleIncreaseQnt({ image, category, pricing, quntity, name })} className="bg-white aspect-square rounded-full p-2"><FaPlus size={15} /></span>
                                        </div>
                                        <div className="text-lg font-bold text-primaryText">{quntity * pricing[type]} rs</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="mt-5 space-y-3">

                        {/* address details  */}
                        {
                            address && (
                                <div>
                                    <h1 className="font-bold text-primaryText text-lg">Address</h1>
                                    <div className="flex items-center gap-2 border border-border p-2 rounded-md">
                                        <div className="basis-[80%]">
                                            <b>{`${address?.name}`}</b>
                                            <p>{address?.building},</p>
                                            <p className="font-semibold">{address?.area},{address?.city?.value}</p>
                                            {/* <p><span className="font-semibold">landmark</span>: {address?.landmark}</p> */}
                                        </div>
                                        <span onClick={() => {
                                            setActiveIndex(2)
                                        }} className="bg-primary border-2 basis-[10%] border-primaryText p-2 rounded-full"><FaPencil className="fill-primaryText cursor-pointer hover:fill-secondary" size={20} /></span>
                                    </div>
                                </div>
                            )
                        }

                        {/* order summary  */}
                        <div>
                            <h1 className="font-bold text-primaryText text-lg">Order Summary</h1>
                            <div className="bg-[#f2f2f2] p-2 mt-2 rounded-md text-secondaryText font-semibold text-sm flex flex-col gap-2">
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <span>Sub Total</span>
                                    <span>{total} rs</span>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <span>Tax</span>
                                    <span>0 rs</span>
                                </div>
                                <div className="flex items-center justify-between gap-2 w-full border-t-2 border-dashed pt-2 border-border text-lg font-bold">
                                    <span>Total</span>
                                    <span>{total} rs</span>
                                </div>
                            </div>
                        </div>
                        {/* payment modes */}
                        <h1 className="font-bold text-primaryText text-lg">Payment Method</h1>
                        <div className="bg-white border border-border p-2  rounded-md text-secondaryText font-semibold text-sm flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash on delivery"
                                    checked={paymentMethod === "cash on delivery"}
                                    onChange={handlePaymentChange}
                                    id={"cod"}
                                    className="peer hidden"

                                />
                                <span className="inline-block size-4 border border-black rounded-full peer-checked:bg-primary bg-white"></span>
                                <label htmlFor="cod" className="inline-block">Cash on delivery</label>

                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <input
                                    id={"online"}
                                    type="radio"
                                    name="payment"
                                    value="pay online"
                                    checked={paymentMethod === "pay online"}
                                    onChange={handlePaymentChange}
                                    className=" hidden peer"
                                />
                                <span className="inline-block size-4 border border-black rounded-full peer-checked:bg-primary bg-white"></span>
                                <label htmlFor="online" className="inline-block">Pay Online</label>
                            </div>
                        </div>

                        <button className={`bg-primary p-3 text-xl  rounded-md w-full text-white ${loading ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100"}`} onClick={handlePayment}>
                            {
                                loading ? <div className="flex items-center justify-center gap-2">
                                    <Loader size={25} />
                                    <span className="text-xl">Loading..</span>
                                </div> : "Checkout"
                            }

                        </button>
                    </div>
                </div>
            }

        </div>
    )
}
export default Cart
