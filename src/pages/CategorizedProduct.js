import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategorizedProduct = () => {
  const params = useParams();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategorizedProduct = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      const json = await res.json();
      if (json.success) {
        setCategory(json.category);
        setProducts(json.product);
      }
    };
    if (params?.slug) getCategorizedProduct();
  }, [params.slug]);

  document.title = `Ecommerce App | ${category?.name}`;
  return (
    <div>
      <div className="mb-8 mt-3 flex flex-col justify-center items-center sm:mt-5 sm:text-xl">
        <h2 className=" text-center my-1">
          Category - <strong className="font-medium">{category?.name}</strong>
        </h2>
        <p className="text-sm sm:text-base">
          {products?.length} {products?.length > 1 ? "results" : "result"} found
        </p>
      </div>
      {/* Proucts Card */}
      <div className="my-4 px-2 min-w-[60vw] flex gap-1 flex-wrap justify-center sm:pl-4 sm:gap-2">
        {products?.map((product) => (
          <Link
            to={`/product/${product.slug}`}
            key={product._id}
            className="shadow-md border pb-1 rounded overflow-hidden w-40 sm:w-48 sm:min-h-[12rem] sm:h-[18rem] transition hover:scale-[1.02] focus:scale-[1.02]"
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

              <div className="flex justify-between items-center mt-2">
                <button className="bg-blue-600 text-white text-sm sm:text-base rounded py-[.2rem] px-1 hover:bg-blue-800">
                  More Detail
                </button>
                <p className="text-sm sm:text-base mt-1 text-gray-500 justify-self-end font-mono self-end font-semibold">
                  {product.price}$
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorizedProduct;
