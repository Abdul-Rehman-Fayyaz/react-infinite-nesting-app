import type { NotificationProps } from "./notification-types";
import "./styles.css";

const Notification = ({ message, className }: NotificationProps) => {
  return (
    <div className={`notification-content${className ? " " + className : ""}`}>
      {message}
    </div>
  );
};
export default Notification;
