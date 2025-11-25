import { filterFerroliList } from "./ferroli";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";

import { formatProductImageUrl } from "./products";

const resolveLanguage = () => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem("language");
  if (stored) return stored;

  if (window.navigator?.language) {
    return window.navigator.language.split("-")[0];
  }

  return null;
};

const sanitizeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const addFavorite = async (productId) => {
  const normalizedId = sanitizeNumber(productId);

  if (!normalizedId) {
    throw new Error("Invalid product id");
  }

  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ product_id: normalizedId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }

  return response.json();
};

export const fetchFavorites = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  const filtered = filterFerroliList(data);

  return filtered.map((item) => {
    const favoriteId =
      item.id ?? item.favorite_id ?? item.fav_id ?? item.pivot_id ?? item.product_id;

    return {
      ...item,
      id: favoriteId,
      image: formatProductImageUrl(item.image),
    };
  });
};

export const deleteFavorite = async (favoriteId) => {
  const normalizedId = sanitizeNumber(favoriteId);

  if (!normalizedId) {
    throw new Error("Invalid favorite id");
  }

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/favorites/${normalizedId}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete favorite");
  }

  return response.json();
};
