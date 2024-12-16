import React from 'react'
import { Link } from 'react-router-dom'
const Cart = () => {
  return (
    <>
        <div className="mx-26">
            <div className="flex border gap-[23.3rem] justify-center">
                <h1 className="">Product</h1>
                <h1 className="">Price</h1>
                <h1 className="">Quantity</h1>
                <h1 className="">Subtotal</h1>
            </div>
            <div className="">
                <div className="flex">
                    <img src="" alt="" className="" />
                    <h1 className=""></h1>
                </div>
                <h1 className=""></h1>
                <div className="">
                    <input type="number" />
                </div>
                <div className="h1"></div>
            </div>
            <div className="border ">
                <h1 className="">Cart Total</h1>
                <div className="flex">
                    <h1 className="">Subtotal</h1>
                    <h1 className=""></h1>
                </div>
                <div className="flex">
                    <h1 className="">Shipping</h1>
                    <h1 className=""></h1>
                </div>
                <div className="flex mb-10">
                    <h1 className="">Total</h1>
                    <h1 className=""></h1>
                </div>
                <Link to="/checkout" className="bg-red-500 text-white p-4 rounded-md">Proceed to checkout</Link>
            </div>
        </div>
    </>
  )
}

export default Cart