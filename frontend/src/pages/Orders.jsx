import { useEffect, useState } from "react"
import { IoMdListBox } from "react-icons/io";
import { useToast } from "../hooks/use-toast"
import { db } from "../firebase/firebase"
import { getDoc, doc } from "firebase/firestore";
import Loader from "../loaders/Loader";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import CancelOrder from "../components/CancelOrder";
const Orders = ({setActiveIndex}) => {
    const { user } = JSON.parse(localStorage.getItem('user'))
    const { uid } = user;
    const { toast } = useToast()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCancelOrder, setShowCancelOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);


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
                loading && (
                    <div className="min-h-[calc(100vh-100px)] grid place-items-center z-[10000] relative bg-white top-0 left-0 w-full">
                        <Loader size={50} />
                    </div>
                )
            }

            {
                !loading ? orders?.length > 0 ?
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className={"w-full mb-4"}>
                            <TabsTrigger className={"w-1/2"} value="account">Latest Order</TabsTrigger>
                            <TabsTrigger className={"w-1/2"} value="password">Total Orders  ({orders?.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="flex gap-4 relative border-b-2 border-inputSecondary pb-2 pt-4 first:pt-0">
                                <IoMdListBox size={25} className="text-primary" />
                                <div className="grow">
                                    <h2 className="text-xl font-normal">Order Summary</h2>

                                    <p className="">
                                        {orders[0]?.date}
                                    </p>
                                    <div className="border-b-2 border-dashed border-black pb-2">
                                        {
                                            orders[0]?.order?.map((item, index) => (
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
                                            <p>{orders[0]?.totalBill}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p>Delivery Charges</p>
                                            <p>0</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p>Payment Mode</p>
                                            <p>{orders[0]?.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-1 text-lg justify-between font-bold">
                                        <p className="">Total</p>
                                        <p>{orders[0]?.totalBill}</p>
                                    </div>

                                    {
                                        orders[0]?.cancelOrder?.status ? <span className="text-red-500 font-bold inline-block text-base mt-2">Order cancelled successfully !!</span> : <button onClick={() => {
                                            setShowCancelOrder(true);
                                            setSelectedOrder(orders[0])
                                        }} className="bg-red-500 rounded-sm mt-4 px-6 py-3 text-base text-white hover:opacity-50 transition-all duration-300">
                                            <span className=" w-full h-full flex items-center justify-center">
                                                Cancel Order
                                            </span>
                                        </button>
                                    }



                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            {
                                orders?.map(({
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
                                ))
                            }
                        </TabsContent>
                    </Tabs>
                    : <div className="h-[50vh] grid place-items-center"><div className="font-bold text-xl text-center text-primary">No order availabel..</div></div>
                    : null
            }

            <CancelOrder setActiveIndex={setActiveIndex}  showCancelOrder={showCancelOrder} setShowCancelOrder={setShowCancelOrder} setSelectedOrder={setSelectedOrder} selectedOrder={selectedOrder} />
        </div>
    )
}

export default Orders