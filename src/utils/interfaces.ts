export type ColSizeType = number;

export interface BookSectionProps {
  id: string;
  title: string;
  description: string;
  parentId?: string;
  children: BookSectionProps[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  collaborator: string;
}

export interface BookProps {
  title: string;
  description: string;
  author: string;
  collaborator: string;
}
