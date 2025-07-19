import type { EmptyDataProps } from "./empty-data-types";

import "./styles.css";

export const EmptyData = ({
  title,
  description,
  icon,
  children,
}: EmptyDataProps) => {
  return (
    <div className="empty-data-container">
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="icon">{description}</div>
      {children}
    </div>
  );
};

export default EmptyData;
