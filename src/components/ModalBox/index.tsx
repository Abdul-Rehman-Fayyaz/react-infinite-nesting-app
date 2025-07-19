import { Modal } from "antd";
import type { ModalBoxProps } from "./modal-box-types";

import "./styles.css";

const ModalBox = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  className = "",
  closeIcon = true,
  width,
  closable = true,
}: ModalBoxProps) => {
  return (
    <Modal
      open={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      className={`collaborator-modal-container${
        className ? " " + className : ""
      }`}
      footer={false}
      closeIcon={closeIcon}
      width={width}
      centered
      rootClassName="collaborator-modal-root"
      closable={closable}
    >
      {children}
    </Modal>
  );
};

export default ModalBox;
