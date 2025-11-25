import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import useLanguage from "./useLanguage";

const serializeFilters = (filters) => JSON.stringify(filters || {});

const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchProducts(filters)
      .then((data) => {
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProducts([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language, serializeFilters(filters)]);

  return products;
};

export default useProducts;
