import { buildHeaders } from "./http";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";
const PRODUCT_IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || `${API_BASE_URL}/storage/product-images`;

const startsWithProtocol = (value) => /^https?:\/\//i.test(value);

const stripBasePath = (path, base) => {
  const normalizedPath = path.replace(/^\/+/, "");

  const basePathMatch = base.match(/^https?:\/\/[^/]+\/(.+)$/i);
  const basePath = basePathMatch ? basePathMatch[1].replace(/^\/+/, "") : "";

  if (basePath && normalizedPath.toLowerCase().startsWith(basePath.toLowerCase())) {
    return normalizedPath.slice(basePath.length).replace(/^\/+/, "");
  }

  return normalizedPath;
};

export const formatProductImageUrl = (path) => {
  if (!path) return "";

  if (startsWithProtocol(path)) {
    return path;
  }

  const normalizedBase = PRODUCT_IMAGE_BASE_URL.replace(/\/$/, "");
  const normalizedPath = stripBasePath(path, normalizedBase);

  return `${normalizedBase}/${normalizedPath}`;
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
  const headers = buildHeaders();

  const response = await fetch(buildProductsUrl(filters), {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  if (!Array.isArray(data)) return [];

  return data.map((product) => ({
    ...product,
    image: formatProductImageUrl(product.image),
  }));
};

export const fetchProductFilters = async () => {
  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/products/filters`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product filters");
  }

  const data = await response.json();

  if (!data || typeof data !== "object") return null;

  const catalogs = Array.isArray(data.catalogs) ? data.catalogs : [];
  const normalizedCatalogs = catalogs.map((catalog) => ({
    ...catalog,
    categories: (Array.isArray(catalog?.categories) ? catalog.categories : []).map(
      (category) => ({
        ...category,
        children: Array.isArray(category?.children) ? category.children : [],
      })
    ),
  }));

  return {
    colors: Array.isArray(data.colors) ? data.colors : [],
    sizes: Array.isArray(data.sizes) ? data.sizes : [],
    min_price:
      typeof data.min_price === "number" ? data.min_price : Number(data.min_price) || 0,
    max_price:
      typeof data.max_price === "number" ? data.max_price : Number(data.max_price) || 0,
    brands: Array.isArray(data.brands) ? data.brands : [],
    catalogs: normalizedCatalogs,
  };
};

export const fetchProduct = async (id) => {
  if (!id) return null;

  const headers = buildHeaders();

  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  if (!data || typeof data !== "object") return null;

  const formattedImages = (data.images || []).map((img) =>
    formatProductImageUrl(img.url || img.image || img.path || img)
  );

  return {
    ...data,
    image: formatProductImageUrl(data.image),
    images: formattedImages,
  };
};
