export interface MediaMixProps {
  imgSrc?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode | number;
  className?: string;
  imgAlt?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}
