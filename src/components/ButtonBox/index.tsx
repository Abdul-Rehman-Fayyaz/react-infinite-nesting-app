import classNames from "classnames";

import "./styles.css";
import type { ButtonBoxProps } from "./button-box-types";

const ButtonBox = ({ label, onClick, className, icon }: ButtonBoxProps) => {
  return (
    <div
      className={classNames("btn-box-container", className)}
      onClick={onClick}
    >
      {icon && <div className="btn-box-icon">{icon}</div>}
      {label && <div className="btn-box-label">{label}</div>}
    </div>
  );
};

export default ButtonBox;
