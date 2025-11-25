import { useEffect, useState } from "react";
import { fetchSlides } from "../api/slides";
import useLanguage from "./useLanguage";

const useSlides = () => {
  const [slides, setSlides] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchSlides()
      .then((data) => {
        if (isMounted) {
          setSlides(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSlides([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return slides;
};

export default useSlides;
