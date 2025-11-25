import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const LoadingContext = createContext({
  isLoading: false,
  triggerManualLoading: async () => {},
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const activeCountRef = useRef(0);
  const originalFetchRef = useRef(null);

  const stopAfterDelay = useCallback(async () => {
    await delay(3000);
    activeCountRef.current = Math.max(activeCountRef.current - 1, 0);
    if (activeCountRef.current === 0) {
      setIsLoading(false);
    }
  }, []);

  const triggerManualLoading = useCallback(async () => {
    activeCountRef.current += 1;
    setIsLoading(true);
    await stopAfterDelay();
  }, [stopAfterDelay]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.fetch !== "function") {
      return undefined;
    }

    originalFetchRef.current = window.fetch;

    window.fetch = async (...args) => {
      activeCountRef.current += 1;
      setIsLoading(true);

      try {
        const response = await originalFetchRef.current(...args);
        await delay(3000);
        return response;
      } finally {
        activeCountRef.current = Math.max(activeCountRef.current - 1, 0);
        if (activeCountRef.current === 0) {
          setIsLoading(false);
        }
      }
    };

    return () => {
      if (originalFetchRef.current) {
        window.fetch = originalFetchRef.current;
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      triggerManualLoading,
    }),
    [isLoading, triggerManualLoading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoadingContext = () => useContext(LoadingContext);
