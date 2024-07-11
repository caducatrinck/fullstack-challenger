/* eslint-disable no-restricted-syntax */

export interface IApiPaginationReturn<T> {
  data: T;
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

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

export interface IPostProdutos {
  categoria_id: number;
  nome: string;
  preco: number;
  foto: string;
  situacao: true;
  updated_at: string;
  created_at: string;
  id: number;
}
