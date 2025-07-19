import type { MediaMixProps } from "./media-mix-types";

const MediaMix = ({
  imgSrc,
  title,
  description,
  className,
  imgAlt = "image",
  icon,
  onClick,
}: MediaMixProps) => {
  return (
    <div
      className={`media-mix-container${className ? " " + className : ""}`}
      onClick={onClick}
    >
      <div className="media-mix-content">
        {imgSrc && (
          <div className="media-mix-img">
            <img className="personalityImage" src={imgSrc} alt={imgAlt} />
          </div>
        )}
        {icon && <div className="icon">{icon}</div>}

        <div className="media-mix-meta">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
};
export default MediaMix;
