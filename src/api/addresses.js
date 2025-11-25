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

const sanitizeId = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const fetchAddresses = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to load addresses");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const createAddress = async (payload) => {
  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const updateAddress = async (id, payload) => {
  const normalizedId = sanitizeId(id);

  if (!normalizedId) {
    throw new Error("Invalid address id");
  }

  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses/${normalizedId}`, {
    method: "PUT",
    credentials: "include",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};

export const deleteAddress = async (id) => {
  const normalizedId = sanitizeId(id);

  if (!normalizedId) {
    throw new Error("Invalid address id");
  }

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/profile/addresses/${normalizedId}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete address");
  }

  const data = await response.json();
  return data && typeof data === "object" ? data : null;
};
