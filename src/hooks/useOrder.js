import { useCallback, useState } from "react";
import { createOrder } from "../api/orders";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submitOrder = useCallback(async ({ paymentMethodId, shippingMethodId }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createOrder({ paymentMethodId, shippingMethodId });
      setResult(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitOrder, loading, error, result };
};

export default useOrder;
