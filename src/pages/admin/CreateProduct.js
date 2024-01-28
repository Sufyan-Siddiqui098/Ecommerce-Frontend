import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import { useDispatch, useSelector } from "react-redux";
import { switchAlert, triggerAlert } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //For category options
  const [search, setSearch] = useState("");
  const [hide, setHide] = useState(true);

  //button disable
  const [disableBtn, setDisableBtn] = useState(false);

  //Categories get from API
  const [categories, setCategories] = useState([]);

  //Preview for image
  const [preview, setPreview] = useState(false);

  //For creating product request
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  //Create Product Handler
  const handleCreateProduct = async () => {
    try {
      setDisableBtn(true)
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
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        {
          method: "POST",
          headers: {
            authorization: authToken,
          },
          body: productData,
        }
      );
      const json = await response.json();
      dispatch(triggerAlert(json));
      if(json.success){
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      dispatch(triggerAlert(error));
      console.log("error", error);
    } finally {
      //Hiding alert
      setTimeout(() => {
        dispatch(switchAlert());
        setDisableBtn(false);
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

  //Get all category
  useEffect(() => {
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

    getAllCategories();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex  w-full" onClick={handleHideOptions}>
      <AdminMenu />
      <div className="p-1 my-2 sm:pl-3 sm:py-3">
        <h1 className="sm:text-xl my-2 md:text-2xl md:mb-4">CreateProduct</h1>
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
              defaultValue=""
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
            <div className="my-3">
              <label
                htmlFor="image"
                className={`p-1 rounded border-[1px] border-white  sm:px-2 transition cursor-pointer hover:border-[#7aa7c7] focus:border-[#7aa7c7] ${
                  photo
                    ? "bg-sky-600 text-white"
                    : "bg-[#e9e9e9] text-[#39739d]"
                }`}
              >
                {photo ? photo.name : "Upload Product image"}
                <input
                  hidden
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
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
                      src={URL.createObjectURL(photo)}
                      alt="product"
                    />
                  </div>
                )}
              </div>
            )}

            {/* CREATE PRODUCT BUTTON */}
            <button
              disabled={disableBtn}
              className="bg-blue-600 border-none outline-none text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:brightness-50"
              onClick={handleCreateProduct}
            >
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
