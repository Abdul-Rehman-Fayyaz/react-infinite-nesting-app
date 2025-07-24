import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useLabels from "../../../../hooks/use-labels";
import type { BookActionsProps, ModalType } from "../book-types";
import React, { useState } from "react";
import ModalBox from "../../../../components/ModalBox";
import AddBookForm from "../BookForm";
import { getStorageItem } from "../../../../utils/common-utils";

const BookSectionActions = React.memo(
  ({
    bookId,
    book,
    handleDeleteBook,
    handleEditBook,
    handleAddChild,
    level,
  }: BookActionsProps) => {
    const activeUser = getStorageItem("activeUser");

    const { userRole } = activeUser;

    const hasPermissions = userRole === "AUTHOR";

    const { levelLabel } = useLabels(["levelLabel"]);

    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>("edit");

    const toggle = () => {
      setIsOpen((prev) => !prev);
    };

    const handleBookAction = (modalType: ModalType) => {
      setModalType(modalType);
      toggle();
    };

    const renderModal = () => {
      if (!isOpen) return <></>;

      const modalProps = {
        isOpen,
        onClose: toggle,
        width: 600,
        className: "add-new-book-modal",
      };

      return (
        <ModalBox {...modalProps}>
          <AddBookForm
            closeModal={toggle}
            modalType={modalType}
            book={book}
            handleEditBook={handleEditBook}
            handleAddChild={handleAddChild}
          />
        </ModalBox>
      );
    };

    return (
      <div className="book-actions-container">
        <ul className="book-action-list">
          <li className="book-list-level">
            {levelLabel} <span>{level}</span>
          </li>
          <li
            className={`add-child-book${
              hasPermissions ? " action" : " not-allowed"
            }`}
            onClick={() => hasPermissions && handleBookAction("child")}
          >
            {hasPermissions ? <PlusOutlined /> : <LockOutlined />}
          </li>
          <li
            className="edit-book action"
            onClick={() => handleBookAction("edit")}
          >
            <EditOutlined />
          </li>
          <li
            className={`delete-book${
              hasPermissions ? " action" : " not-allowed"
            }`}
            onClick={() => hasPermissions && handleDeleteBook(bookId)}
          >
            {hasPermissions ? <DeleteOutlined /> : <LockOutlined />}
          </li>
        </ul>

        {renderModal()}
      </div>
    );
  }
);

export default BookSectionActions;
