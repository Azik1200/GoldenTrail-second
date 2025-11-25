const normalizeFlag = (value) => {
  if (typeof value === "string") {
    return value.trim();
  }

  return value;
};

export const isFerroliItem = (value) => {
  const normalized = normalizeFlag(value);
  return normalized === 1 || normalized === true || normalized === "1";
};

export const filterFerroliList = (items = []) =>
  (Array.isArray(items) ? items : []).filter((item) =>
    isFerroliItem(item?.is_ferrolli)
  );

export const filterFerroliTree = (items = [], childKey = "children") =>
  filterFerroliList(items).map((item) => ({
    ...item,
    [childKey]: filterFerroliTree(item?.[childKey], childKey),
  }));

export const keepFerroliObject = (item) =>
  item && typeof item === "object" && isFerroliItem(item.is_ferrolli)
    ? item
    : null;
