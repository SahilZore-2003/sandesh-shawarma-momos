import { RiDeleteBin6Fill } from "react-icons/ri"
import item1 from "../../public/item1.png"
import Image from "../components/Image"
import { FaMinus, FaPencil, FaPlus } from "react-icons/fa6"
import { useCart, } from "@context/cartContext"
const Cart = () => {
    const { cart, handleIncreaseQnt, handleDecreaseQnt, handleRemoveFromCart } = useCart()
    const total = cart.reduce((sum, item) => {
        return sum + item.quntity * parseFloat(item.price);
    }, 0);


    return (
        <div className=''>
            <h1 className="font-bold text-primaryText text-xl px-4">{
                cart.length ? "Cart Items" : "Cart Is Empty"

            }</h1>
            {
                cart.length > 0 && <div className="my-4 px-4">
                    {
                        cart.map(({ image, category, price, quntity, name }, index) => (
                            <div key={index} className="flex items-start gap-4 border-b-2 last:border-b-0 pb-2 border-border first:mt-0 mt-2 ">
                                <Image src={image} className={"basis-[30%] rounded-md"} />
                                <div className="grow">
                                    <div className="grow flex gap-2 items-center">
                                        <div className="grow text-xl">
                                            <h2 className="font-semibold text-lg text-primaryText">{name}</h2>
                                            <small className="font-bold text-inputSecondary">{price} rs</small>
                                        </div>
                                        <RiDeleteBin6Fill onClick={() => handleRemoveFromCart(name)} size={28} className="fill-secondary hover:fill-primaryText" />
                                    </div>
                                    <div className="flex items-center justify-between gap-2 mt-2">
                                        <div className="flex items-center gap-3 p-2 rounded-full bg-[#f0f0f0] text-lg text-black">
                                            <span onClick={() => handleDecreaseQnt({ image, category, price, quntity, name })} className="bg-white aspect-square rounded-full p-2"><FaMinus size={15} /></span>
                                            <span>{quntity}</span>
                                            <span onClick={() => handleIncreaseQnt({ image, category, price, quntity, name })} className="bg-white aspect-square rounded-full p-2"><FaPlus size={15} /></span>
                                        </div>
                                        <div className="text-lg font-bold text-primaryText">{quntity * price} rs</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="mt-5 space-y-3">
                        <h1 className="font-bold text-primaryText text-lg">Address</h1>
                        <div className="flex items-center gap-2 border border-border p-2 rounded-md">
                            <p>Sadguru apartment room no:34 Dhabasi vasti....</p>
                            <span><FaPencil className="fill-primaryText cursor-pointer hover:fill-secondary" size={20} /></span>
                        </div>
                        <h1 className="font-bold text-primaryText text-lg">Order Summary</h1>
                        <div className="bg-[#f2f2f2] p-2 rounded-md text-secondaryText font-semibold text-sm flex flex-col gap-2">
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

                        <button className="bg-primary p-3  rounded-md w-full text-white">Proceed to Checkout</button>
                    </div>
                </div>
            }

        </div>
    )
}
export default Cart
