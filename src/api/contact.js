const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

const resolveLanguage = () => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem("language");
  if (stored) return stored;

  if (window.navigator?.language) {
    return window.navigator.language.split("-")[0];
  }

  return null;
};

export const submitContact = async (payload) => {
  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact request");
  }

  return response.json();
};
