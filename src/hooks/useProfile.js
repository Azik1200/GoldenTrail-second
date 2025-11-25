import { useCallback, useEffect, useState } from "react";
import { fetchProfile, updateProfile as updateProfileApi } from "../api/profile";
import useLanguage from "./useLanguage";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProfile();
        if (isMounted) {
          setProfile(data);
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

    load();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const updateProfile = useCallback(async (payload) => {
    setSaving(true);
    setSaveError(null);
    setSaveMessage("");

    try {
      const response = await updateProfileApi(payload);
      setProfile((prev) => (prev ? { ...prev, ...payload } : { ...payload }));
      setSaveMessage(response?.message || "Профиль обновлён");
      return response;
    } catch (err) {
      setSaveError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, error, saving, saveError, saveMessage, updateProfile };
};

export default useProfile;
