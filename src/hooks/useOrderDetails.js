import { useCallback, useState } from "react";
import { fetchOrderById } from "../api/orders";
import useLanguage from "./useLanguage";

const useOrderDetails = () => {
  const [detailsById, setDetailsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadDetails = useCallback(
    async (orderId) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOrderById(orderId);
        setDetailsById((prev) => ({ ...prev, [orderId]: data }));
        return data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [language]
  );

  return { detailsById, loadDetails, loading, error };
};

export default useOrderDetails;
