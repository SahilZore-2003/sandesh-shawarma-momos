import {
    Dialog,
    DialogContent,
    DialogOverlay
} from "@/components/ui/dialog";
import { useToast } from "../hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore"



const CancelOrder = ({
    showCancelOrder,
    setShowCancelOrder,
    selectedOrder
}) => {
    let user = localStorage.getItem('user')
    if (user) {
        user = JSON.parse(user)?.user
    }
    const { toast } = useToast()
    console.log(selectedOrder, "selectedOrder")
    const [cancelStatus, setCancelStatus] = useState({
        status: false,
        reasons: [false, false, false, false, false]
    });
    const [loading, setLoading] = useState(false);

    const cancelOrderReasons = [
        "Item no longer needed",
        "Order placed by mistake",
        "Changed mind about the purchase",
        "Incorrect item ordered",
        "Duplicate order placed",
    ]

    const handleCancelOrder = async () => {
        try {
            setLoading(true)
            const orderRef = doc(db, `orders/${selectedOrder.userid}`);
            await updateDoc(orderRef, {
                [`${selectedOrder.orderId}.cancelOrder`]: {
                    ...cancelStatus,
                    reasons: cancelStatus?.reasons.filter((item, index) => item ? cancelOrderReasons[index] : "")
                }
            });
            toast({
                title: "Order cancel successfully",
                description: "Buy something new item",
                className: "bg-green-400 text-white",
            });
            setShowCancelOrder(false)

        } catch (error) {
            console.log(error)
            toast({
                title: "something went wrong!",
                description: "try after some time",
                className: "bg-red-400 text-white",
            });
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog open={showCancelOrder}>
            <DialogOverlay
                onClick={() => {
                    setShowCancelOrder(false);
                }}
                className={"bg-transparent"}
            >
                <DialogContent
                    className={"max-h-[80vh] overflow-y-scroll"}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <div>
                        <div className="mb-6">
                            <h2 className="text-xl">What Happend {user?.displayName || ""}</h2>
                            <p className="text-sm text-inputSecondary">Why are you cancel this order</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                cancelOrderReasons?.map((item, index) => (
                                    <div key={index} className="flex space-x-2 items-center w-full">
                                        <Checkbox onCheckedChange={(val) => {
                                            const updatedReason = [...cancelStatus.reasons]
                                            updatedReason[index] = val
                                            setCancelStatus((prev) => (
                                                {
                                                    status: updatedReason.some(val => val === true),
                                                    reasons: updatedReason
                                                }
                                            ))
                                        }} id={`reason-${index}`} value={index} className={"caret-primary"} />
                                        <label
                                            htmlFor={`reason-${index}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {item}
                                        </label>
                                    </div>
                                ))
                            }



                            <button disabled={!cancelStatus?.status} onClick={() => {
                                handleCancelOrder()
                            }} className="bg-red-500 rounded-sm mt-4 px-6 py-3 text-base text-white hover:opacity-50 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none">

                                <span className=" w-full h-full flex items-center justify-center">
                                    {loading ? "please wait" : "Cancel Order Confirm"}
                                </span>
                            </button>


                        </div>

                    </div>
                </DialogContent>
            </DialogOverlay>
        </Dialog>

    )
}

export default CancelOrder
