import { useCallback, useEffect, useState } from "react";
import {
  createAddress,
  deleteAddress as deleteAddressApi,
  fetchAddresses,
  updateAddress as updateAddressApi,
} from "../api/addresses";
import useLanguage from "./useLanguage";

const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState(null);
  const { language } = useLanguage();

  const loadAddresses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAddresses();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchAddresses();
        if (isMounted) {
          setAddresses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    load();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const addAddress = useCallback(async (payload) => {
    setSaving(true);
    setMessage("");
    setActionError(null);

    try {
      const created = await createAddress(payload);
      setAddresses((prev) => {
        const cleared = payload?.is_default
          ? prev.map((item) => ({ ...item, is_default: false }))
          : prev;
        return created ? [...cleared, created] : cleared;
      });
      setMessage("Адрес добавлен");
      return created;
    } catch (err) {
      setActionError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateAddress = useCallback(async (id, payload) => {
    setSaving(true);
    setMessage("");
    setActionError(null);

    try {
      const response = await updateAddressApi(id, payload);
      setAddresses((prev) => {
        const cleared = payload?.is_default
          ? prev.map((item) => ({ ...item, is_default: item.id === id }))
          : prev;

        return cleared.map((item) =>
          item.id === id
            ? {
                ...item,
                ...payload,
              }
            : item
        );
      });
      setMessage(response?.message || "Адрес обновлён");
      return response;
    } catch (err) {
      setActionError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteAddress = useCallback(async (id) => {
    setDeletingId(id);
    setMessage("");
    setActionError(null);

    try {
      const response = await deleteAddressApi(id);
      setAddresses((prev) => prev.filter((item) => item.id !== id));
      setMessage(response?.message || "Адрес удалён");
      return response;
    } catch (err) {
      setActionError(err);
      throw err;
    } finally {
      setDeletingId(null);
    }
  }, []);

  return {
    addresses,
    loading,
    error,
    saving,
    deletingId,
    message,
    actionError,
    addAddress,
    updateAddress,
    deleteAddress,
    refresh: loadAddresses,
  };
};

export default useAddresses;
