import { useEffect, useState } from "react";
import { fetchProductFilters } from "../api/products";
import useLanguage from "./useLanguage";

const useProductFilters = () => {
  const [filters, setFilters] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchProductFilters()
      .then((data) => {
        if (isMounted) {
          setFilters(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFilters(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return filters;
};

export default useProductFilters;
