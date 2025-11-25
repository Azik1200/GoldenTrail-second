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

export const fetchProfile = async () => {
  const language = resolveLanguage();
  const headers = {
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const updateProfile = async (payload) => {
  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: "PUT",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};
