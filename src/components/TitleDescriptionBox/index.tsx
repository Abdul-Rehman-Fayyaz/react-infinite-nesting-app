import type { TitleDescriptionProps } from "./title-description-box-types";

const TitleDescriptionBox = ({
  title,
  subTitle,
  description,
  className,
}: TitleDescriptionProps) => {
  return (
    <div
      className={`title-description-container${
        className ? " " + className : ""
      }`}
    >
      <div className="title">{title}</div>
      <div className="subtitle">{subTitle}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default TitleDescriptionBox;
