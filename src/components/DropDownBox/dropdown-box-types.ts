import type { MenuProps } from "antd";

export interface DropDownBoxProps {
  items: MenuProps["items"];
  imageSrc?: string;
  className?: string;
  label?: string;
}

export type CustomMenuItem = Exclude<MenuProps["items"], undefined>[number] & {
  path?: string;
};
