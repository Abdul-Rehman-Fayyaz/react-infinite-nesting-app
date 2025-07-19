import type { BookProps, BookSectionProps } from "../../../utils/interfaces";

export type BookStatProps = {
  totalBooks: number;
  totalCollaborators: number;
  maxDepth: number;
};

export type AddBookTypes = {
  title: string;
  description: string;
};

export interface BookFormProps {
  closeModal: () => void;
  handleNewBook?: (data: BookProps) => void;
  handleEditBook?: (id: string, data: BookProps) => void;
  handleAddChild?: (id: string, data: BookProps) => void;
  modalType: ModalType;
  book?: BookSectionProps;
}

export type ModalType = "add" | "edit" | "child";

export interface BookHeaderProps {
  handleNewBook: (data: BookProps) => void;
  bookSection: BookSectionProps[];
}

export interface BookListProps {
  bookSection: BookSectionProps[];
  level: number;
  handleDeleteBook: (id: string) => void;
  handleEditBook: (id: string, data: BookProps) => void;
  handleAddChild: (id: string, data: BookProps) => void;
}

export interface BookActionsProps {
  bookId: string;
  handleDeleteBook: (id: string) => void;
  handleEditBook: (id: string, data: BookProps) => void;
  book: BookSectionProps;
  handleAddChild: (id: string, data: BookProps) => void;
  level: number;
}

export interface BookListCardProps {
  book: BookSectionProps;
}
