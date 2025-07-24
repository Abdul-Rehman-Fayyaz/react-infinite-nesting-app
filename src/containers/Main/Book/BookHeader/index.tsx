import { Col, Row } from "antd";
import { useMemo, useState } from "react";
import useLabels from "../../../../hooks/use-labels";
import { PlusIcon } from "../../../../svg-images";
import { colSizes } from "../../../../utils/common-utils";
import type { BookHeaderProps } from "../book-types";
import {
  booksStatistics,
  bookStatsInitialData,
  prepareBookStatistics,
} from "../book-utils";

import { isEmpty } from "lodash";
import ButtonBox from "../../../../components/ButtonBox";
import MediaMix from "../../../../components/MediaMix";
import ModalBox from "../../../../components/ModalBox";
import TitleDescriptionBox from "../../../../components/TitleDescriptionBox";
import AddBookForm from "../BookForm";

const BookHeader = ({ handleNewBook, bookSection }: BookHeaderProps) => {
  const { yourProjectsLabel, organizeYourWorkLabel, addBookLabel } = useLabels([
    "yourProjectsLabel",
    "organizeYourWorkLabel",
    "addBookLabel",
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const stats = useMemo(() => {
    console.log("📊 Calculating statistics...");
    if (isEmpty(bookSection)) return bookStatsInitialData;
    return prepareBookStatistics(bookSection);
  }, [bookSection]);

  const statsList = booksStatistics(stats).map((stat) => {
    const { icon, key, label, value } = stat;
    return (
      <Col key={key} {...colSizes(8, 8, 8, 8, 8, 8)}>
        <MediaMix
          className="book-statistic-item"
          icon={icon}
          title={label}
          description={value}
        />
      </Col>
    );
  });

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
          handleNewBook={handleNewBook}
          modalType="add"
        />
      </ModalBox>
    );
  };

  return (
    <div className="book-header-container">
      <Row>
        <Col {...colSizes(12, 12, 12, 12, 12, 12)}>
          <TitleDescriptionBox
            title={yourProjectsLabel}
            description={organizeYourWorkLabel}
            className="heading-style"
          />
        </Col>
        <Col {...colSizes(12, 12, 12, 12, 12, 12)}>
          <ButtonBox
            icon={<PlusIcon />}
            label={addBookLabel}
            className="add-btn"
            onClick={toggle}
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>{statsList}</Row>
      {renderModal()}
    </div>
  );
};

export default BookHeader;
