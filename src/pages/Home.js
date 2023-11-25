import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { switchAlert, triggerAlert } from "../store/UserSlice";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PriceFilter from "../components/Filters/PriceFilter";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Home = () => {
  //custom hook
  const categories = useCategory();

  const dispatch = useDispatch();
  //loading
  const [loading, setLoading] = useState(false);
  //Pagination
  const [page, setPage] = useState(1);
  //Filters
  const [checkCategory, setCheckCategory] = useState([]);
  const [radio, setRadio] = useState([]);
  //Products
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  //Menu for Mobile view
  const [menu, setMenu] = useState(false);

  const handleFilterCategory = (checked, id) => {
    let all = [...checkCategory];
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((cat) => cat !== id);
    }
    setCheckCategory(all);
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      setPage((pre) => pre + 1);
      const res = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page + 1}`
      );
      const json = await res.json();
      setLoading(false);
      if (json.success) {
        setProducts([...products, ...json?.product]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Total products count
    const getTotalProductCount = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/product-count`
        );
        const json = await res.json();
        if (json.success) setProductCount(json.totalCount);
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //Get the product for user
    const getProductList = async () => {
      try {
        setPage(1); //setting page number for next product-list call.

        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/product-list/1`
        );
        const json = await res.json();
        setProducts(json.product);
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };
    //Get filtered products
    const getFilteredProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/filter-product`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checked: checkCategory, radio }),
          }
        );
        const json = await res.json();
        if (json.success) {
          setProducts(json.filterProduct);
          setProductCount(json.totalCount);
        }
      } catch (error) {
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //if filters are checked - call filtered product api function
    if (radio.length || checkCategory.length) {
      getFilteredProduct();
    }
    //If no filters - call all products api function
    if (checkCategory.length < 1 && radio.length < 1) {
      getTotalProductCount();
      getProductList();
    }
  }, [dispatch, checkCategory, radio]);

  document.title = "Ecommerce App | Home";
  return (
    <div className="min-h-creen flex w-full">
      {/* ==========Filter Column */}
      <div className="flex flex-col items-center min-w-max min-h-screen shadow-md relative bg-[#202020] text-[#fff] overflow-x-scroll sm:overflow-hidden">
        {/* Menu for mobile view */}
        <div
          className=" self-start my-1 z-10 w-[50px]  flex justify-center items-center sm:hidden"
          onClick={() => setMenu((pre) => !pre)}
        >
          {/* Conditional svg rendering for mobile view*/}
          {!menu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <h3
          className={`${
            menu ? "visible" : "invisible"
          } sm:visible font-semibold sm:mt-4 justify-self-start`}
        >
          Filters
        </h3>
        <hr className="w-[90%] mt-4" />
        {/* Category Filter */}
        <CategoryFilter
          menu={menu}
          handleFilterCategory={handleFilterCategory}
          categories={categories}
        />
        <hr className="w-[90%] mt-4" />
        {/* Price Filter */}
        <PriceFilter menu={menu} setRadio={setRadio} />

        <button
          className={`${
            menu ? "visible" : "p-0 w-0 overflow-hidden invisible"
          } p-1 rounded self-start ml-1 sm:w-[90%] bg-red-500 text-sm sm:visible`}
          onClick={() => window.location.reload()}
        >
          Reset Filter
        </button>
      </div>
      {/* =========Filter Column --- END */}

      {/* ---------------- Product Column ---------------- */}
      <div className="flex flex-col w-full overflow-x-scroll">
        <div className="w-full flex justify-end">
          <p className="text-gray-500 mt-4 mr-3 sm:mr-4 font-semibold">
            Total Product : {productCount}
          </p>
        </div>
        <div className="my-4 p-1 min-w-[60vw] sm:pl-4  flex gap-1 flex-wrap sm:gap-2">
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

        {products?.length < productCount ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              loadMore();
            }}
            disabled={!(products.length < productCount)}
            className={`disabled:cursor-not-allowed disabled:opacity-30 w-max p-1 ml-1 mb-4 rounded px-2 bg-[#202020] text-[#ffffff] sm:ml-4`}
          >
            {loading ? "Loading" : "Load more.."}
          </button>
        ) : (
          <p className=" mt-3 p-1 ml-1 mb-4 rounded px-2 opacity-60 text-center sm:ml-4">
            No more Products
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
