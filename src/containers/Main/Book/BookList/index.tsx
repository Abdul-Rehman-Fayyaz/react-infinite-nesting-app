import { Col, Row } from "antd";
import { colSizes } from "../../../../utils/common-utils";
import type { BookListProps } from "../book-types";

import BookSectionActions from "../BookActions";
import BookListCard from "./BookListCard";
import EmptyData from "../../../../components/EmptyData";
import useLabels from "../../../../hooks/use-labels";
import { FolderIcon } from "../../../../svg-images";

const BookList = ({
  bookSection,
  level,
  handleDeleteBook,
  handleEditBook,
  handleAddChild,
}: BookListProps) => {
  const { noBookSectionYetLabel, createYourFirstSectionLabel } = useLabels([
    "noBookSectionYetLabel",
    "createYourFirstSectionLabel",
  ]);

  const bookList =
    bookSection.length > 0 ? (
      bookSection.map((book) => {
        const { id, children } = book;

        return (
          <div key={id}>
            <div
              className="book-list-item"
              style={{ marginLeft: level * 24 + "px" }}
            >
              <Row gutter={[24, 24]}>
                <Col {...colSizes(16, 16, 16, 16, 16, 16)}>
                  <BookListCard book={book} />
                </Col>
                <Col {...colSizes(8, 8, 8, 8, 8, 8)}>
                  <BookSectionActions
                    bookId={id}
                    handleDeleteBook={handleDeleteBook}
                    handleEditBook={handleEditBook}
                    handleAddChild={handleAddChild}
                    book={book}
                    level={level}
                  />
                </Col>
              </Row>
            </div>

            {children && children.length > 0 && (
              <BookList
                bookSection={children}
                level={level + 1}
                handleDeleteBook={handleDeleteBook}
                handleEditBook={handleEditBook}
                handleAddChild={handleAddChild}
              />
            )}
          </div>
        );
      })
    ) : (
      <EmptyData
        icon={<FolderIcon />}
        title={noBookSectionYetLabel}
        description={createYourFirstSectionLabel}
      />
    );

  return <div className="book-list-container">{bookList}</div>;
};

export default BookList;
