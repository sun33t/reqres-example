import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react';

export type ApiResponseMeta = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  support: {
    url: string;
    text: string;
  };
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type ApiResponse = ApiResponseMeta & {
  data: User[];
};

export type TableRowProps = {
  user: User;
};

export type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: User[];
  totalPages: number;
};

export type PaginationButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  setCurrentPage: TableProps['setCurrentPage'];
};
