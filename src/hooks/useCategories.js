import { useEffect, useState } from "react";
import { fetchCategories } from "../api/categories";
import useLanguage from "./useLanguage";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchCategories()
      .then((data) => {
        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCategories([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return categories;
};

export default useCategories;
