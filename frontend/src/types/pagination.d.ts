/* eslint-disable no-restricted-syntax */

export interface IPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
}
