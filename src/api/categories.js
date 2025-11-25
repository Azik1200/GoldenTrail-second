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

const normalizeCategories = (categories = []) =>
  (Array.isArray(categories) ? categories : []).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    children: normalizeCategories(category.children),
  }));

export const fetchCategories = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();

  return normalizeCategories(data);
};
