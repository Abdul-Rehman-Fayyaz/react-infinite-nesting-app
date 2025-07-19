import { useState } from "react";
import type { BookProps, BookSectionProps } from "../utils/interfaces";

export const useBooks = (initialSections: BookSectionProps[]) => {
  const [bookSection, setBookSection] =
    useState<BookSectionProps[]>(initialSections);

  const handleDeleteBook = (id: string) => {
    const filteredBooks = bookSection.filter((book) => book.id !== id);
    setBookSection(filteredBooks);
  };

  const handleEditBook = (id: string, data: BookProps) => {
    setBookSection((prev) =>
      prev.map((book) =>
        book.id === id
          ? {
              ...book,
              title: data.title,
              description: data.description,
              author: data.author,
              collaborator: data.collaborator,
              updatedAt: new Date(),
            }
          : book
      )
    );
  };

  const handleAddChild = (parentId: string, data: BookProps) => {
    const newBookSection: BookSectionProps = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      parentId,
      children: [],
      author: data.author,
      collaborator: data.collaborator,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const appendChildBookSection = (
      sections: BookSectionProps[],
      parentId: string,
      newChild: BookSectionProps
    ): BookSectionProps[] => {
      return sections.map((section) => {
        if (section.id === parentId) {
          return {
            ...section,
            children: [...section.children, newChild],
          };
        } else if (section.children.length > 0) {
          return {
            ...section,
            children: appendChildBookSection(
              section.children,
              parentId,
              newChild
            ),
          };
        }
        return section;
      });
    };

    setBookSection((prev) =>
      appendChildBookSection(prev, parentId, newBookSection)
    );
  };

  const handleNewBook = (data: BookProps) => {
    const newBook: BookSectionProps = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      children: [],
      author: data.author,
      collaborator: data.collaborator,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setBookSection((prev) => [...prev, newBook]);
  };

  return {
    bookSection,
    handleNewBook,
    handleDeleteBook,
    handleEditBook,
    handleAddChild,
  };
};
