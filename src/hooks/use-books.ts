"use client";

import { useState, useCallback } from "react";
import type { BookProps, BookSectionProps } from "../utils/interfaces";

export const useBooks = (initialSections: BookSectionProps[]) => {
  const [bookSection, setBookSection] =
    useState<BookSectionProps[]>(initialSections);

  const handleDeleteBook = useCallback((id: string) => {
    const deleteBookRecursively = (
      sections: BookSectionProps[]
    ): BookSectionProps[] => {
      return sections
        .filter((book) => book.id !== id)
        .map((book) => {
          if (book.children && book.children.length > 0) {
            return {
              ...book,
              children: deleteBookRecursively(book.children),
            };
          }
          return book;
        });
    };

    setBookSection((prev) => deleteBookRecursively(prev));
  }, []);

  const handleEditBook = useCallback((id: string, data: BookProps) => {
    const updateBookRecursively = (
      sections: BookSectionProps[]
    ): BookSectionProps[] => {
      return sections.map((book) => {
        if (book.id === id) {
          return {
            ...book,
            title: data.title,
            description: data.description,
            author: data.author,
            collaborator: data.collaborator,
            updatedAt: new Date(),
          };
        } else if (book.children && book.children.length > 0) {
          return {
            ...book,
            children: updateBookRecursively(book.children),
          };
        }
        return book;
      });
    };

    setBookSection((prev) => updateBookRecursively(prev));
  }, []);

  const handleAddChild = useCallback((parentId: string, data: BookProps) => {
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
  }, []);

  const handleNewBook = useCallback((data: BookProps) => {
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
  }, []);

  return {
    bookSection,
    handleNewBook,
    handleDeleteBook,
    handleEditBook,
    handleAddChild,
  };
};
