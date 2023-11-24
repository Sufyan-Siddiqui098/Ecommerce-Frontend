import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { switchAlert, triggerAlert } from "../store/UserSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState();
  //Related products
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
        );
        const json = await res.json();
        if (json.success) {
          setProduct(json.product);
          getRelatedProducts(json.product._id, json.product.category._id);
        }
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //Related products
    const getRelatedProducts = async (pid, cid) => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
        );
        const json = await res.json();
        if (json.success) {
          setRelatedProduct(json.relatedProduct);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProduct();
  }, [dispatch, slug]);

  return (
    <>
      {product && (
        <div className=" grid grid-rows-[minmax(100px,30vh)_2fr] gap-1 gap-y-2 mt-2 p-2 min-h-[30vh] md:max-h-[50vh]  sm:gap-2 sm:grid-cols-[1fr_1fr] md:gap-3 md:grid-cols-[1fr_1.7fr] md:grid-rows-1  ">
          {/* Image column */}
          <div className="rounded overflow-hidden shadow-md">
            <img
              className="h-full w-full object-cover"
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
            />
          </div>
          {/* Product */}
          <div className="h-full px-1 flex flex-col justify-center">
            {/* Titile adn price */}
            <div className=" ">
              <h2 className="text-2xl font-semibold tracking-wide	mt-2 font-sans">
                {product.name}
              </h2>
              <p className="font-medium text-sm text-[#258635]">
                USD <strong className="text-xl">{product.price}$</strong>
              </p>
            </div>
            {/* Description and Category of product */}
            <div className="mt-3">
              {/* Description */}
              <p className=" pb-3">{product.description}</p>
              {/* Category of product */}
              <p className="text-sm mt-2">
                <strong className="text-xs font-medium md:text-sm block opacity-70">
                  Category:
                </strong>
                <strong className="font-semibold">
                  {product.category.name}
                </strong>
              </p>
            </div>

            <button className="border w-max px-2 py-1 text-[#fffafa] mt-4 bg-blue-500 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <hr className="w-[95%] mt-7 mb-4 m-auto" />

      {/* RELATED PRODUCTS */}
      <div className="flex justify-center flex-col items-cente gap-4 p-2 mb-10">
        <div>
          <h3 className="font-semibold mb-4 opacity-80 text-center">
            Related Products
          </h3>
        </div>
        <div className="flex gap-3 overflow-x-auto py-2 w-full sm:pl-4 sm:justify-center">
          {relatedProduct ? (
            relatedProduct.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                key={product._id}
                className="shadow-md  pb-1 rounded overflow-hidden min-w-[120px] w-40 sm:w-48 sm:min-h-[12rem] sm:h-[18rem] transition hover:scale-[1.02] focus:scale-[1.02]"
              >
                <div className="h-32">
                  <img
                    className="h-full w-full object-cover"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col gap-1 p-1 h-[calc(100%-8.1rem)]  sm:p-3">
                  <p className="text-sm text-sky-700 sm:text-base font-semibold my-1 ">
                    {product.name}
                  </p>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-xs sm:text-sm ">
                      {product.description.length > 30
                        ? product.description.substring(0, 50) + "..."
                        : product.description}
                    </p>
                  </div>

                  <div className=" mt-2">
                    <p className="text-sm sm:text-base mt-1 text-gray-500 justify-self-end font-mono self-end font-semibold">
                      {product.price}$
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No Product</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
