import React from "react";
import MediaMix from "../../../../../components/MediaMix";
import useLabels from "../../../../../hooks/use-labels";
import { FolderIcon } from "../../../../../svg-images";
import type { BookListCardProps } from "../../book-types";

const BookListCard = React.memo(({ book }: BookListCardProps) => {
  const { authorLabel, collaboratorLabel, updatedAtLabel } = useLabels([
    "authorLabel",
    "collaboratorLabel",
    "updatedAtLabel",
  ]);

  const { title, description, author, collaborator, updatedAt } = book;

  return (
    <div className="book-list-content">
      <MediaMix
        icon={<FolderIcon />}
        title={title}
        description={description}
        className="book-meta-info"
      />
      <ul className="book-list-meta">
        <li className="book-list-meta-item">
          <span className="label">{authorLabel}:</span>
          <span className="value">{author},</span>
        </li>

        <li className="book-list-meta-item">
          <span className="label">{collaboratorLabel}:</span>
          <span className="value">{collaborator},</span>
        </li>

        <li className="book-list-meta-item">
          <span className="label">{updatedAtLabel}:</span>
          <span className="value">{updatedAt.toLocaleDateString()}</span>
        </li>
      </ul>
    </div>
  );
});

export default BookListCard;
