/* eslint-disable no-restricted-syntax */
interface IGetProdutos {
  categoria_id: number;
  id: number;
  nome: string;
  preco: numeric;
  foto: File;
  situacao: boolean;
}

// types/api.ts
export interface IApiPaginationReturn<T> {
  data: T;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

// types/categoria.ts
export interface ICategory {
  id: number;
  nome: string;
}

export interface IGetCategory extends ICategory {}

export interface IProduct {
  id: number;
  categoria_id: number;
  nome: string;
  preco: number;
  foto: string;
  situacao: boolean;
}

export interface IGetProduct extends IProduct {}

export interface IProdutoCard {
  id: number;
  nome: string;
  categoria: {
    id: number;
    nome: string;
  };
  preco: number;
  foto: string | null;
  situacao: boolean;
}

export interface IGetListaProdutos {
  produtos: IProdutoCard[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

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
