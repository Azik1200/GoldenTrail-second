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
  if (stored && ["az", "ru"].includes(stored)) return stored;

  if (window.navigator?.language) {
    const short = window.navigator.language.split("-")[0];
    if (["az", "ru"].includes(short)) return short;
  }

  return "az";
};

const getNestedTranslation = (lang, key) => {
  const segments = key.split(".");
  return segments.reduce((acc, segment) => acc?.[segment], translations[lang]);
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
    if (!["az", "ru"].includes(nextLang)) return;
    setLanguageState(nextLang);
  }, []);

  const t = useCallback(
    (key) =>
      getNestedTranslation(language, key) ||
      getNestedTranslation(language === "az" ? "ru" : "az", key) ||
      key,
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
