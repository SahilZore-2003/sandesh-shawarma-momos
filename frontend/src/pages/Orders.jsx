import { useEffect, useState } from "react"
import { IoMdListBox } from "react-icons/io";
import { useToast } from "../hooks/use-toast"
import { db } from "../firebase/firebase"
import { getDoc, doc } from "firebase/firestore";
import Loader from "../loaders/Loader";
const Orders = () => {
    const { user } = JSON.parse(localStorage.getItem('user'))
    const { uid } = user;
    const { toast } = useToast()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);



    const fetchAllOrdersForUser = async (userId) => {
        try {
            setLoading(true)
            // Reference to the document at orders/userId
            const userOrdersRef = doc(db, "orders", userId);
            const userOrdersSnap = await getDoc(userOrdersRef);

            if (userOrdersSnap.exists()) {
                const userData = userOrdersSnap.data();
                const ordersArray = Object.entries(userData).map(([key, value]) => {
                    return { orderId: key, ...value };
                });

                const refactorOrder = ordersArray.map((data) => ({ ...data, ["order"]: Object.values(data.order) }))

                setOrders(refactorOrder.sort((a, b) => new Date(b.date) - new Date(a.date)))
            } else {
                toast({
                    title: "No orders availabel yet",
                    description: "Please buy something food",
                    className: "bg-green-400 text-white",
                });

            }
        } catch (error) {
            console.error("Error fetching user orders:", error);
        } finally {
            setLoading(false)
        }
    };




    useEffect(() => {
        fetchAllOrdersForUser(uid);
    }, [])
    return (
        <div className="relative pb-16">
            {
                loading && <div className="min-h-[calc(100vh-92px)] grid place-items-center">
                    <Loader size={50} />
                </div>
            }


            {
                !loading && orders?.length > 0 ? orders?.map(({
                    date, paymentMethod, order, totalBill
                }, index) => (
                    <div key={index} className="flex gap-4 relative border-b-2 border-inputSecondary pb-2 pt-4 first:pt-0">
                        <IoMdListBox size={25} className="text-primary" />
                        <div className="grow">
                            <h2 className="text-xl font-normal">Order Summary</h2>
                            <p className="">
                                {date}
                            </p>
                            <div className="border-b-2 border-dashed border-black pb-2">
                                {
                                    order?.map((item, index) => (
                                        <div key={index} className="mt-2 flex items-center justify-between gap-4 font-normal">
                                            <p className="basis-full"> <span className="font-bold">{item?.quntity}x</span>{item?.name}</p>
                                            <p className="basis-[20%] text-end shrink-0 font-bold">{item?.price * item?.quntity}</p>
                                        </div>
                                    ))
                                }


                            </div>
                            <div className="border-b-2 border-dashed border-black py-2 font-bold">
                                <div className="flex items-center justify-between">
                                    <p>subtotal</p>
                                    <p>{totalBill}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Delivery Charges</p>
                                    <p>0</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Payment Mode</p>
                                    <p>{paymentMethod}</p>
                                </div>
                            </div>
                            <div className="flex items-center py-1 text-lg justify-between font-bold">
                                <p className="">Total</p>
                                <p>{totalBill}</p>
                            </div>

                        </div>
                    </div>
                )) : <div className="h-[50vh] grid place-items-center"><div className="font-bold text-xl text-center text-primary">No order availabel..</div></div>
            }

        </div>
    )
}

export default Orders