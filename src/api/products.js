const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";
const PRODUCT_IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || `${API_BASE_URL}/storage/product-images`;

const startsWithProtocol = (value) => /^https?:\/\//i.test(value);

export const formatProductImageUrl = (path) => {
  if (!path) return "";

  if (startsWithProtocol(path)) {
    return path;
  }

  const normalizedBase = PRODUCT_IMAGE_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.replace(/^\//, "");

  return `${normalizedBase}/${normalizedPath}`;
};

const resolveLanguage = () => {
  if (typeof window === "undefined") return null;

  const stored = window.localStorage.getItem("language");
  if (stored) return stored;

  if (window.navigator?.language) {
    return window.navigator.language.split("-")[0];
  }

  return null;
};

const buildProductsUrl = (filters = {}) => {
  const url = new URL(`${API_BASE_URL}/api/products`);

  if (filters.category) {
    url.searchParams.set("category", filters.category);
  }

  if (filters.catalog) {
    url.searchParams.set("catalog", filters.catalog);
  }

  return url.toString();
};

export const fetchProducts = async (filters = {}) => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(buildProductsUrl(filters), {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((product) => ({
    ...product,
    image: formatProductImageUrl(product.image),
  }));
};

export const fetchProductFilters = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/products/filters`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product filters");
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    return null;
  }

  return {
    colors: Array.isArray(data.colors) ? data.colors : [],
    sizes: Array.isArray(data.sizes) ? data.sizes : [],
    min_price:
      typeof data.min_price === "number" ? data.min_price : Number(data.min_price) || 0,
    max_price:
      typeof data.max_price === "number" ? data.max_price : Number(data.max_price) || 0,
    brands: Array.isArray(data.brands) ? data.brands : [],
    catalogs: Array.isArray(data.catalogs) ? data.catalogs : [],
  };
};

export const fetchProduct = async (id) => {
  if (!id) return null;

  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();

  if (!data) return null;

  const formattedImages = (data.images || []).map((img) =>
    formatProductImageUrl(img.url || img.image || img.path || img)
  );

  return {
    ...data,
    image: formatProductImageUrl(data.image),
    images: formattedImages,
  };
};
