import { Dropdown, type MenuProps } from "antd";
import type { CustomMenuItem, DropDownBoxProps } from "./dropdown-box-types";

import React from "react";

import "./styles.css";

const DropDownBox: React.FC<DropDownBoxProps> = ({
  items,
  className,
  label,
}) => {
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const item = items?.find(
      (item) => item?.key === info.key
    ) as CustomMenuItem;

    if (item.key === "logout") {
      localStorage.removeItem("activeUser");
      window.location.reload();
    }
  };
  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={["click"]}
      className={`dropdown-box${className ? " " + className : ""}`}
    >
      <div className="dropdown-trigger-content">
        {label && <span className="dropdown-label">{label}</span>}
      </div>
    </Dropdown>
  );
};

export default DropDownBox;
