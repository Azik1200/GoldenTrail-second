import { useCallback, useEffect, useState } from "react";
import {
  decrementCartItem,
  deleteCartItem,
  fetchCartItems,
  incrementCartItem,
} from "../api/cart";
import useLanguage from "./useLanguage";

const useCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCartItems();
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  const removeItem = useCallback(async (cartItemId) => {
    const normalizedId = Number(cartItemId);

    if (!Number.isFinite(normalizedId)) {
      setError(new Error("Invalid cart item id"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteCartItem(normalizedId);
      setItems((prev) => prev.filter((item) => item.id !== normalizedId));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const incrementItem = useCallback(async (cartItemId) => {
    const normalizedId = Number(cartItemId);

    if (!Number.isFinite(normalizedId)) {
      setError(new Error("Invalid cart item id"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await incrementCartItem(normalizedId);
      const updatedQuantity = response?.item?.quantity;

      setItems((prev) =>
        prev.map((item) =>
          item.id === normalizedId && typeof updatedQuantity === "number"
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const decrementItem = useCallback(async (cartItemId) => {
    const normalizedId = Number(cartItemId);

    if (!Number.isFinite(normalizedId)) {
      setError(new Error("Invalid cart item id"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await decrementCartItem(normalizedId);
      const updatedQuantity = response?.item?.quantity;

      setItems((prev) => {
        if (typeof updatedQuantity === "number") {
          if (updatedQuantity <= 0) {
            return prev.filter((item) => item.id !== normalizedId);
          }

          return prev.map((item) =>
            item.id === normalizedId ? { ...item, quantity: updatedQuantity } : item
          );
        }

        return prev.filter((item) => item.id !== normalizedId);
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    items,
    loading,
    error,
    refresh: loadCart,
    removeItem,
    incrementItem,
    decrementItem,
  };
};

export default useCart;
