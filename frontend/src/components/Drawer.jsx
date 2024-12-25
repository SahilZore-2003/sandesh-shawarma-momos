import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
} from "@/components/ui/drawer"
import { IoMdListBox } from "react-icons/io"


const drawer = ({ showOrder, setShowOrder, selectedOrder }) => {

    console.log(selectedOrder)


    return (
        <Drawer open={showOrder}>
            <DrawerOverlay onClick={() => setShowOrder(false)} className="bg-black/5">
                <DrawerContent
                    onClick={(event) => event.stopPropagation()}
                    className="pb-16 overflow-y-scroll hide-scrollbar"
                    style={{ height: '100vh' }} // Set height here
                >
                    <div className="flex gap-4 px-4 relative border-b-2 border-inputSecondary pb-2 pt-4 first:pt-0">

                        <div className="grow">
                            <h2 className="text-xl font-normal">Order Summary</h2>

                            <p className="">
                                {selectedOrder?.date}
                            </p>
                            <div className="border-b-2 border-dashed border-black pb-2">
                                {
                                    selectedOrder?.order && Object.keys(selectedOrder?.order).map(key => ({
                                        ...selectedOrder?.order[key]
                                    })).map((item, index) => (
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
                                    <p>{selectedOrder?.totalBill}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Delivery Charges</p>
                                    <p>0</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Payment Mode</p>
                                    <p>{selectedOrder?.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="flex items-center py-1 text-lg justify-between font-bold">
                                <p className="">Total</p>
                                <p>{selectedOrder?.totalBill}</p>
                            </div>





                        </div>
                    </div>

                </DrawerContent>
            </DrawerOverlay>
        </Drawer>


    )
}

export default drawer
