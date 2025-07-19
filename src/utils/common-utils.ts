import type { ColSizeType } from "./interfaces";

export const getStorageItem = (key: string) => {
  const item = localStorage.getItem(key);

  if (item) return JSON.parse(item);

  return null;
};

export const colSizes = (
  xxl: ColSizeType,
  xl: ColSizeType,
  lg: ColSizeType,
  md: ColSizeType,
  sm: ColSizeType,
  xs: ColSizeType
) => {
  return {
    xxl,
    xl,
    lg,
    md,
    sm,
    xs,
  };
};

export const getUserInitials = (userName: string) => {
  return userName
    .split(" ")
    .map((word) => word[0])
    .join("");
};
