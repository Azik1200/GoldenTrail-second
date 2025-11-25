import { filterFerroliList } from "./ferroli";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://goldentrail.az";
const SLIDE_IMAGE_BASE_URL =
  import.meta.env.VITE_SLIDE_IMAGE_BASE_URL || `${API_BASE_URL}/storage`;

const startsWithProtocol = (value) => /^https?:\/\//i.test(value);

export const formatSlideImageUrl = (path) => {
  if (!path) return "";

  if (startsWithProtocol(path)) {
    return path;
  }

  const normalizedBase = SLIDE_IMAGE_BASE_URL.replace(/\/$/, "");
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

export const fetchSlides = async () => {
  const language = resolveLanguage();
  const headers = language ? { "X-Language": language } : {};

  const response = await fetch(`${API_BASE_URL}/api/slides`, {
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch slides");
  }

  const data = await response.json();

  return filterFerroliList(data);
};
