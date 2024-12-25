import { IoMdListBox } from "react-icons/io";
import Drawer from "../components/Drawer";
import { useEffect, useState } from "react";
import Loader from "../loaders/Loader";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [selectedOrder, setselectedOrder] = useState(null);
    const handleFetchOrders = async () => {
        try {
            setLoading(true)
            const ordersRef = collection(db, "orders");
            const snapshot = await getDocs(ordersRef);
            const orders = snapshot.docs.map((doc) => ({
                id: doc.id, // Document ID
                ...doc.data(), // Document data
            }));

            const allOrders = [];
            orders.forEach((order) => {
                const keyArray = Object.keys(order)
                keyArray.forEach(item => {
                    if (item !== 'id') {
                        const data = order[item];
                        allOrders.push(data)
                    }
                })
            })
            const sortData = allOrders.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; // Sort in descending order
            })
            setOrders(sortData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleFetchOrders()
    }, [])

    return (
        <div className="relative">
            {loading &&
                <div className="grid place-items-center h-[80vh]"><Loader size={50} /></div>
            }
            {
                !loading && orders?.length > 0 ? orders?.map(item => (
                    <div key={item?.orderId
                    } onClick={() => {setShowOrder(true);setselectedOrder(item)}} className="flex gap-4 relative border-b-2 border-inputSecondary pb-2 pt-4 first:pt-0">
                        <IoMdListBox size={25} className="text-primary" />
                        <div className="grow">

                            <h2 className="text-xl font-normal">{item?.date}</h2>
                            <div className="border-b-2 border-dashed border-black py-2 font-bold">
                                <div className="flex items-center justify-between">
                                    <p>Toatl Quntity</p>
                                    <p>{item?.order?.length || 0}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>sunTotal</p>
                                    <p>{item?.totalBill}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Delivery Charges</p>
                                    <p>{item?.deliveryCharges}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Payment Mode</p>
                                    <p>{item?.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="flex items-center py-1 text-lg justify-between font-bold">
                                <p>Total Bill</p>
                                <p className="">{item?.totalBill}</p>
                            </div>


                        </div>
                    </div>
                )) : <p className="text-center text-xl text-primary">No orders availabel</p>
            }

            {/* drawer  */}
            <Drawer selectedOrder={selectedOrder} showOrder={showOrder} setShowOrder={setShowOrder} />
        </div>
    )
}

export default Admin
