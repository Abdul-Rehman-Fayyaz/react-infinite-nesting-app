import { Button, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Notification from "../../../../components/Notification";
import TitleDescriptionBox from "../../../../components/TitleDescriptionBox";
import useLabels from "../../../../hooks/use-labels";
import { getSubmissionData } from "../book-fields-validation";
import type { AddBookTypes, BookFormProps } from "../book-types";
import { addBookInitialData } from "../book-utils";

const BookForm = ({
  closeModal,
  handleNewBook,
  handleEditBook,
  modalType,
  book,
  handleAddChild,
}: BookFormProps) => {
  const {
    addNewBookLabel,
    enterBookNameLabel,
    enterBookDescriptionLabel,
    addBookLabel,
  } = useLabels([
    "addNewBookLabel",
    "enterBookNameLabel",
    "enterBookDescriptionLabel",
    "addBookLabel",
  ]);

  const [form] = Form.useForm();
  const [formFields, setFormFields] =
    useState<AddBookTypes>(addBookInitialData);

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    if (book) {
      const { title, description } = book;
      setFormFields({ title, description });
    }
  }, [book]);

  const onChangeHandler = useCallback(
    (value: string, id: keyof AddBookTypes) => {
      setFormFields((prev) => ({ ...prev, [id]: value }));
      if (errors?.[id]) {
        setErrors((prev) => (prev ? { ...prev, [id]: "" } : null));
      }
    },
    [errors]
  );

  const onFinishHandler = () => {
    const { required, fieldsData } = getSubmissionData(formFields);

    if (!isEmpty(required)) {
      setErrors(required);
    } else {
      const payload = {
        title: fieldsData.title,
        description: fieldsData.description,
        author: "Harf",
        collaborator: "James Smith",
      };

      if (modalType === "add" && handleNewBook) {
        handleNewBook(payload);
      }

      if (modalType === "edit" && handleEditBook && book) {
        const { id } = book;
        handleEditBook(id, payload);
      }

      if (modalType === "child" && handleAddChild && book) {
        const { id } = book;
        handleAddChild(id, payload);
      }

      if (modalType) closeModal();
    }
  };

  return (
    <div className="add-book-form">
      <TitleDescriptionBox title={addNewBookLabel} className="heading-style" />

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinishHandler}
        className="collaborator-form dd-book-form"
      >
        <Input
          className="form-element form-title-element"
          onChange={(e) => onChangeHandler(e.target.value, "title")}
          value={formFields["title"]}
          placeholder={enterBookNameLabel}
        />

        {errors && (
          <Notification
            message={errors["title"]}
            className="error-notification"
          />
        )}

        <Input
          className="form-element form-description-element"
          onChange={(e) => onChangeHandler(e.target.value, "description")}
          value={formFields["description"]}
          placeholder={enterBookDescriptionLabel}
        />

        {errors && (
          <Notification
            message={errors["description"]}
            className="error-notification"
          />
        )}
      </Form>

      <Button
        type="primary"
        onClick={() => form.submit()}
        className="add-book-submit-btn"
        size="large"
      >
        <span>{addBookLabel}</span>
      </Button>
    </div>
  );
};

export default BookForm;
