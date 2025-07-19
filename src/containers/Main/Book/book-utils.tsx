import { getLabel } from "../../../hooks/use-labels";
import { BookIcon, CollaboratorIcon, FolderIcon } from "../../../svg-images";
import type { BookSectionProps } from "../../../utils/interfaces";
import type { BookStatProps } from "./book-types";

export const initialBookSections: BookSectionProps[] = [
  {
    id: "1",
    title: "HardWork",
    description: "Key to Success",
    children: [],
    author: "John Doe",
    collaborator: "James Smith",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-10"),
  },
];

export const addBookInitialData = {
  title: "",
  description: "",
};

export const bookStatsInitialData = {
  totalBooks: 0,
  totalCollaborators: 0,
  maxDepth: 0,
};

export const booksStatistics = ({
  totalBooks,
  totalCollaborators,
  maxDepth,
}: BookStatProps) => {
  return [
    {
      key: "totalBooks",
      label: getLabel("totalBooksLabel"),
      icon: <FolderIcon />,
      value: totalBooks,
    },
    {
      key: "collaborators",
      label: getLabel("collaboratorsLabel"),
      icon: <CollaboratorIcon />,
      value: totalCollaborators,
    },
    {
      key: "maxdepth",
      label: getLabel("maxDepthLabel"),
      icon: <BookIcon />,
      value: maxDepth,
    },
  ];
};

export const prepareBookStatistics = (bookSection: BookSectionProps[]) => {
  const countTotalBooks = (sections: BookSectionProps[]): number => {
    let count = sections.length;

    sections.forEach((section) => {
      if (section.children && section.children.length > 0) {
        count += countTotalBooks(section.children);
      }
    });

    return count;
  };

  const findMaxDepth = (
    sections: BookSectionProps[],
    currentDepth = 1
  ): number => {
    if (sections.length === 0) return 0;

    let maxDepth = currentDepth;

    sections.forEach((section) => {
      if (section.children && section.children.length > 0) {
        const childDepth = findMaxDepth(section.children, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
      }
    });

    return maxDepth;
  };

  const getUniqueCollaborators = (
    sections: BookSectionProps[]
  ): Set<string> => {
    const collaborators = new Set<string>();

    sections.forEach((section) => {
      collaborators.add(section.collaborator);
      collaborators.add(section.author);

      if (section.children && section.children.length > 0) {
        const childCollaborators = getUniqueCollaborators(section.children);
        childCollaborators.forEach((collab) => collaborators.add(collab));
      }
    });

    return collaborators;
  };

  const totalBooks = countTotalBooks(bookSection);
  const maxDepth = findMaxDepth(bookSection);
  const uniqueCollaborators = getUniqueCollaborators(bookSection);
  const totalCollaborators = uniqueCollaborators.size;

  return {
    totalBooks,
    totalCollaborators,
    maxDepth,
  };
};
