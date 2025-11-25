import { useEffect, useState } from "react";
import { fetchAbout } from "../api/about";
import useLanguage from "./useLanguage";

const useAbout = () => {
  const [about, setAbout] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    fetchAbout()
      .then((data) => {
        if (isMounted) {
          setAbout(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAbout(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  return about;
};

export default useAbout;
