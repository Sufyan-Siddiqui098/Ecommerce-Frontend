import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { switchAlert, triggerAlert } from "../../store/UserSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //For category options
  const [search, setSearch] = useState("");
  const [hide, setHide] = useState(true);

  //Categories get from API - To select the cateogory for product
  const [categories, setCategories] = useState([]);

  //Preview for image
  const [preview, setPreview] = useState(false);

  //For Updating product
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //Update Product Handler
  const handleUpdate = async () => {
    try {
      //if we wrap all input tags in the form-element(html) we won't use formData
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${productId}`,
        {
          method: "PUT",
          headers: {
            authorization: authToken,
          },
          body: productData,
        }
      );
      const json = await response.json();
      dispatch(triggerAlert(json));
    } catch (error) {
      dispatch(triggerAlert(error));
      console.log("error", error);
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  //Delete Product Handler
  const handleDeleteProduct = async () => {
    try {
      let answer = window.confirm("Are your sure want to delete?")
      if(!answer) return 0;
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            authorization: authToken,
          },
        }
      );
      const json = await response.json();
      dispatch(triggerAlert(json));
      if (json.success) {
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      dispatch(triggerAlert(error));
      console.log("error", error);
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
      }, 2000);
    }
  };

  //hide
  const handleHideOptions = (e) => {
    if (e.target.classList.contains("search")) {
      setHide(false);
    }
    if (
      !e.target.classList.contains("option") &&
      !e.target.classList.contains("search")
    ) {
      setHide(true);
    }
  };

  //Get all category for product to be categorize
  useEffect(() => {
    //Get categories for product to be categorize
    const getAllCategories = async () => {
      try {
        const category = await fetch(
          `${process.env.REACT_APP_API}/api/v1/category/all-categories`
        );
        const json = await category.json();
        //If success - set The categories
        if (json.success) {
          setCategories(json.category);
        }
      } catch (error) {
        console.log("Get product Frontend", error);
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //Get the selected product values
    const getSingleProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`
        );
        const json = await res.json();
        setProductId(json.product._id);
        setName(json.product.name);
        setDescription(json.product.description);
        setCategory(json.product.category._id);
        setSearch(json.product.category.name);
        setPrice(json.product.price);
        setQuantity(json.product.quantity);
        setShipping(json.product.shipping);
      } catch (error) {
        console.log("Get product Frontend", error);
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    //Calling both functions
    getAllCategories();
    getSingleProduct();
  }, [dispatch, slug]);

  //To call product specific photo
  useEffect(() => {
    const getProductPhoto = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}/api/v1/product/product-photo/${productId}`
        );
        if (res.ok) {
          setPhoto(res.url);
        }
      } catch (error) {
        console.log("Get product Frontend", error);
        dispatch(triggerAlert(error));
        //Hiding alert
        setTimeout(() => {
          dispatch(switchAlert());
        }, 2000);
      }
    };

    if (productId) getProductPhoto();
  }, [productId, dispatch]);

  return (
    <div className="min-h-screen flex  w-full" onClick={handleHideOptions}>
      <AdminMenu />
      <div className="p-1 my-2 sm:pl-3 sm:py-3">
        <h1 className="sm:text-xl my-2 md:text-2xl md:mb-4">Update Product</h1>
        <div className="option relative  text-sm  my-2 md:text-base md:w-80">
          <input
            type="search"
            name="search-category"
            id="category-search"
            className="search w-full p-1 rounded border-2 outline-none focus:border-[#202020a8]"
            placeholder="Search Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category list */}
          <div
            className={`absolute bg-[#1a1a1a] text-white transition duration-500 w-0 rounded ${
              hide
                ? "duration-100 -translate-y-4 overflow-hidden"
                : "w-full min-h-[2rem] h-auto p-1 translate-y-1 sm:p-2 "
            }`}
          >
            {/* List inner div */}
            <div className="max-h-28 overflow-y-scroll">
              {categories.map(
                (cat) =>
                  cat.name.toLowerCase().includes(search?.toLowerCase()) && (
                    <option
                      onClick={() => {
                        setCategory(cat._id);
                        setSearch(cat.name);
                      }}
                      key={cat._id}
                      className="cursor-pointer border-b-[1px] border-gray-400 py-1 lst:border-b-0 hover:font-medium"
                    >
                      {cat.name}
                    </option>
                  )
              )}
              {/* last option will be this */}
              <p disable="true" className="opacity-40">
                No More category
              </p>
            </div>
          </div>

          {/* Create Product inputs */}
          <div className="flex flex-col mt-3 justify-center gap-2 [&>*:not(div)]:border [&>*:not(div)]:p-1 sm:[&>*:not(div)]:px-2 [&>*]:rounded">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=""
              name="description"
              id="description"
              placeholder="Product description"
              rows="3"
            ></textarea>

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="price"
              id="price"
              placeholder="Product Price"
            />
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Product Quantity"
            />

            <select
              value={shipping}
              name="shipping"
              id="shipping"
              placeholder="Select"
              onChange={(e) => setShipping(e.target.value)}
            >
              <option value="" disabled>
                --Select Shipping--
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            {/* Upload product image */}
            <div className="my-3 flex-col flex  items-start gap-2 justify-start sm:flex-row">
              <label
                htmlFor="image"
                className={`p-1 rounded border-[1px] border-[#7aa7c7]  sm:px-2 transition cursor-pointer hover:border-white ${
                  photo
                    ? "bg-sky-600 text-white"
                    : "bg-[#e1ecf4] text-[#39739d]"
                }`}
              >
                {photo ? "Change Photo" : "Upload image"}
                <input
                  hidden
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
              {/* Image Preview */}
              {photo && (
                <div>
                  <button
                    onClick={() => setPreview((prev) => !prev)}
                    className="bg-gray-900 p-1 rounded mb-2 text-white capitalize text-sm"
                  >
                    {preview ? "hide" : "show"} preview
                  </button>
                  {preview && (
                    <div className="w-24 border-[1px] sm:w-28">
                      <img
                        className="w-full"
                        src={
                          (photo.name && URL.createObjectURL(photo)) || photo
                        }
                        alt="product"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 [&>*]:py-1 [&>*]:rounded [&>*]:text-sm sm:[&>*]:text-base">
              {/* CREATE PRODUCT BUTTON */}
              <button
                className="bg-blue-600 border-none outline-none text-white hover:border-blue-700 hover:text-blue-700 hover:bg-blue-300"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>

              {/* DELETE PRODUCT BUTTON */}
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white outline-none hover:bg-red-300 hover:border-red-700 hover:text-red-700"
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
