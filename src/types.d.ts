import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SetStateAction,
} from 'react';

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

export type HandleSearchQuery = {
  type: 'email' | 'last_name';
  query: string;
};

export type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  users: User[];
  handleSearchQuery: (_T: HandleSearchQuery) => void;
  clearSearchQueries: () => void;
  isSearch: boolean;
  handleModal: () => {
    setSelectedUser: (_user: User) => void;
    closeModal: () => void;
    openModal: () => void;
    clearSelectedUser: () => void;
  };
};

export type TableTitleProps = Pick<
  TableProps,
  'clearSearchQueries' | 'handleSearchQuery' | 'isSearch'
>;
export type TableRowProps = {
  user: User;
  handleModal: TableProps['handleModal'];
};

export type PaginationButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  setCurrentPage: TableProps['setCurrentPage'];
};

export type ModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  user: User;
};

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export type ButtonProps<T> = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  T;

export type EditUserFormProps = Pick<ModalProps, 'user'>;
