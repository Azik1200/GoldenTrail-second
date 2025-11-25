import { formatProductImageUrl } from "./products";

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

const sanitizeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export const addOrUpdateCartItem = async ({
  productId,
  quantity,
  productColorId,
  productSizeId,
  price,
}) => {
  const normalizedProductId = sanitizeNumber(productId);
  const normalizedQuantity = sanitizeNumber(quantity);

  if (!normalizedProductId || !normalizedQuantity || normalizedQuantity < 1) {
    throw new Error("Invalid cart payload");
  }

  const language = resolveLanguage();
  const headers = {
    "Content-Type": "application/json",
    ...(language ? { "X-Language": language } : {}),
  };

  const body = {
    product_id: normalizedProductId,
    quantity: normalizedQuantity,
  };

  const normalizedColorId = sanitizeNumber(productColorId);
  const normalizedSizeId = sanitizeNumber(productSizeId);
  const normalizedPrice = sanitizeNumber(price);

  if (normalizedColorId) body.product_color_id = normalizedColorId;
  if (normalizedSizeId) body.product_size_id = normalizedSizeId;
  if (typeof normalizedPrice === "number") body.price = normalizedPrice;

  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  return response.json();
};

export const fetchCartItems = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    image: formatProductImageUrl(item.image),
  }));
};

export const deleteCartItem = async (cartItemId) => {
  const normalizedId = sanitizeNumber(cartItemId);

  if (!normalizedId) {
    throw new Error("Invalid cart item id");
  }

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/cart/${normalizedId}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }

  return response.json();
};

export const incrementCartItem = async (cartItemId) => {
  const normalizedId = sanitizeNumber(cartItemId);

  if (!normalizedId) {
    throw new Error("Invalid cart item id");
  }

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/cart/${normalizedId}/increment`, {
    method: "POST",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to increment cart item");
  }

  return response.json();
};

export const decrementCartItem = async (cartItemId) => {
  const normalizedId = sanitizeNumber(cartItemId);

  if (!normalizedId) {
    throw new Error("Invalid cart item id");
  }

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/cart/${normalizedId}/decrement`, {
    method: "POST",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to decrement cart item");
  }

  return response.json();
};
