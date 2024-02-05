import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/CartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartProduct } = useSelector((state) => state.cart);
  const { authToken, userInfo } = useSelector((state) => state.user);
  const price = () => {
    try {
      let total = 0;
      cartProduct?.map((p) => (total += p.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = (id) => {
    //----------- destructure
    let myCart = [...cartProduct];
    //----------- index of clicked product
    const index = myCart.findIndex((p) => p._id === id);
    //----------- matched index product removed - splice modifies original array
    myCart.splice(index, 1);

    dispatch(removeFromCart(myCart));
    //------------ set localStorage with newCart item
    if(myCart.length>0){
      // console.log('inside cartPage - remove cart', myCart)
      localStorage.setItem("cart", JSON.stringify(myCart));
    } else{
      localStorage.removeItem('cart')
    }
  };

  useEffect(()=>{
    let existingCartItem = localStorage.getItem("cart");
    if(existingCartItem && cartProduct.length<1){
      dispatch(addToCart(...JSON.parse(existingCartItem)))
    }
    console.log("cart useeffect")
  }, [dispatch, cartProduct.length])
  return (
    <>
      {/* User welcome */}
      <div>
        <h1 className="text-center my-1 text-xl font-semibold py-2  border bg-gray-100">
          Welcome {userInfo?.name || "Guest"}
        </h1>
        {/* Cart related message */}
        <p className="text-center text-sm md:text-base">
          {cartProduct.length > 0
            ? `You have ${cartProduct.length} items in your cart ${
                authToken ? "" : `Please login to checkout`
              }`
            : "Your cart is empty"}
        </p>
      </div>

      {/* Cart Products & payment */}
      <div className="grid grid-cols-[3fr_1.5fr] py-4 mb-7 gap-1 mt-2 justify-center sm:grid-cols-[2fr_1fr] md:flex md:px-4">
        <div className=" flex flex-col gap-2 sm:px-2 md:w-[50%]">
          {/* products */}
          {cartProduct.length>0 && cartProduct?.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1.78fr] grid-rows-1 items-center gap-[5px] items shadow-md border pb-1 rounded overflow-hidden w-full transition max-h-36 hover:scale-[1.02] focus:scale-[1.02] md:max-h-48 md:w-[90%] "
            >
              <div className="min-w-[4rem]  h-full">
                <img
                  className="h-full w-full object-cover"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>
              {/* decription */}
              <div className="w-full text-xs sm:text-base pr-[2px] h-full  flex flex-col gap-1">
                <p className="text-sm font-semibold text-sky-800 py-1">
                  {product.name}
                </p>
                <p className="overflow-hidden text-ellipsis h-[50%]">
                  {" "}
                  {product.description}
                </p>
                <div className="justify-self-end  flex  gap-2  pr-2 items-center justify-between  my-2">
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="bg-red-700 rounded border-none text-white px-1 text-center pb-[2px]"
                  >
                    Remove
                  </button>
                  <p className="font-medium  text-right">{product.price}$</p>
                </div>
              </div>
            </div>
          ))}

          {cartProduct.length < 1 && (
            <p className="text-center">No products in the cart</p>
          )}
        </div>

        {/* Payment checkout total */}
        <div className="py-2 border text-xs sm:text-sm md:text-base text-center md:w-[30%] h-min">
          <h4 className="font-medium my-2 sm:text-base md:text-lg">
            Cart Summary
          </h4>
          <p className="text-[10px] sm:text-sm md:text-base">
            Total | Checkout | Payment
          </p>
          <hr className="my-2 " />
          <div className="flex flex-col gap-1 mb-2">
            <p className="mt-2">
              Price: <strong>{price()}</strong>
            </p>
          </div>

            {/* IF LOGIN OR not */}
          <div className="">
            {authToken && userInfo ? (
              <div className="flex justify-center flex-wrap items-center gap-1">
                <h4 className="font-medium">Current Address: </h4>
                <h5 className="italic">{userInfo.address}</h5>
                <div className="w-full my-2">
                <Link to="/dashboard/user/profile" className="text-[11px] sm:text-base  p-1 sm:px-2  bg-blue-700 rounded text-white hover:bg-blue-500">Update Address</Link>
                </div>
              </div>
            ):(
              <Link to="/login" className="bg-yellow-700 my-2 p-1 px-2 rounded  text-white hover:brightness-90">Please Login</Link>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CartPage;
