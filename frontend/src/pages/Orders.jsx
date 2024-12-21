import { useEffect, useState } from "react"
import { FaRegFaceSmileBeam } from "react-icons/fa6"
import { useToast } from "../hooks/use-toast"
import { db } from "../firebase/firebase"
import { collection, getDocs } from "firebase/firestore";
const Orders = () => {
    const { user } = JSON.parse(localStorage.getItem('user'))
    const { uid } = user;
    const { toast } = useToast()
    const [orders, setOrders] = useState([]);
    console.log("🚀 ~ Orders ~ orders:", orders)

    async function fetchUserOrders(userId) {
        try {
            // Initialize an array to store all orders
            let allOrderData = [];

            // Reference to the orders subcollections for the specific userId
            const userOrdersRef = collection(db, "orders", userId);

            // Get all subcollections (orderId) under the userId
            const orderSnapshots = await getDocs(userOrdersRef);

            for (const orderDoc of orderSnapshots.docs) {
                const orderId = orderDoc.id; // Get the orderId (subcollection name)

                // Fetch the `date` subcollection for this orderId
                const dateCollectionRef = collection(db, "orders", userId, orderId);
                const dateSnapshots = await getDocs(dateCollectionRef);

                for (const dateDoc of dateSnapshots.docs) {
                    allOrderData.push({
                        orderId,
                        dateId: dateDoc.id, // Get the date subcollection ID
                        ...dateDoc.data(), // Merge the data in the `date` document
                    });
                }
            }
            console.log("All Orders Data:", allOrderData);
            setOrders(allOrderData);
        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong!",
                description: "Try after some time.",
                className: "bg-red-400 text-white",
            });
        }
    }



    useEffect(() => {
        fetchUserOrders(uid);
    }, [])
    return (
        <div className="grid place-items-center min-h-[70vh]">
            <div className='flex flex-col items-center gap-4 text-primary'>
                <h1 className="text-center w-full text-2xl">Thanks for Order food we deliver your order soon...</h1>
                <FaRegFaceSmileBeam size={80} />
            </div>
        </div>
    )
}

export default Orders