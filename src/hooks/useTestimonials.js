import { useEffect, useState } from "react";
import { fetchTestimonials } from "../api/testimonials";
import useLanguage from "./useLanguage";

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchTestimonials()
      .then((data) => {
        if (isMounted) {
          setTestimonials(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setTestimonials([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return testimonials;
};

export default useTestimonials;
