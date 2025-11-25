import { useCallback, useEffect, useState } from "react";
import { addFavorite, deleteFavorite, fetchFavorites } from "../api/favorites";
import useLanguage from "./useLanguage";

const useFavorites = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFavorites();
      setItems(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  const addItem = useCallback(
    async (productId) => {
      const normalizedId = Number(productId);

      if (!Number.isFinite(normalizedId)) {
        setError(new Error("Invalid product id"));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        await addFavorite(normalizedId);
        await loadFavorites();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [loadFavorites]
  );

  const removeItem = useCallback(
    async (favoriteId) => {
      const normalizedId = Number(favoriteId);

      if (!Number.isFinite(normalizedId)) {
        setError(new Error("Invalid favorite id"));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        await deleteFavorite(normalizedId);
        setItems((prev) =>
          prev.filter(
            (item) => (item.id ?? item.favorite_id ?? item.product_id) !== normalizedId
          )
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return { items, loading, error, refresh: loadFavorites, addItem, removeItem };
};

export default useFavorites;
