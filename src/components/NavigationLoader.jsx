import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLoading from "../hooks/useLoading";

const NavigationLoader = () => {
  const location = useLocation();
  const { triggerManualLoading } = useLoading();

  useEffect(() => {
    triggerManualLoading();
  }, [location.pathname, triggerManualLoading]);

  return null;
};

export default NavigationLoader;
