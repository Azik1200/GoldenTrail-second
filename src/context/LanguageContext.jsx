import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext({
  language: "az",
  setLanguage: () => {},
  t: (key) => key,
});

const resolveInitialLanguage = () => {
  if (typeof window === "undefined") return "az";

  const stored = window.localStorage.getItem("language");
  if (stored && ["az", "ru", "en"].includes(stored)) return stored;

  if (window.navigator?.language) {
    const short = window.navigator.language.split("-")[0];
    if (["az", "ru", "en"].includes(short)) return short;
  }

  return "az";
};

const getNestedTranslation = (lang, key) => {
  const segments = key.split(".");
  return segments.reduce((acc, segment) => acc?.[segment], translations[lang]);
};

const formatTranslation = (value, params) => {
  if (typeof value !== "string") return value;

  return Object.keys(params || {}).reduce(
    (acc, paramKey) => acc.replaceAll(`{{${paramKey}}}`, params[paramKey]),
    value
  );
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(resolveInitialLanguage);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const setLanguage = useCallback((nextLang) => {
    if (!["az", "ru", "en"].includes(nextLang)) return;
    setLanguageState(nextLang);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", nextLang);
      window.location.reload();
    }
  }, []);

  const t = useCallback(
    (key, params = {}) => {
      const primary = getNestedTranslation(language, key);
      if (primary) return formatTranslation(primary, params);

      const fallbacks = ["az", "ru", "en"].filter((lang) => lang !== language);
      for (const fb of fallbacks) {
        const fallback = getNestedTranslation(fb, key);
        if (fallback) return formatTranslation(fallback, params);
      }

      return key;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = () => useContext(LanguageContext);
