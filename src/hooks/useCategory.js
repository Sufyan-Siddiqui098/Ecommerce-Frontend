import { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      const json = await res.json();
      if (json.success) setCategories(json.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return categories;
};

export default useCategory;
