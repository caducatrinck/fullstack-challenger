/* eslint-disable no-restricted-syntax */

export interface ICategory {
  nome: string;
  situacao: boolean;
}
export interface IGetCategory {
  nome: string;
  situacao: boolean;
  id: number;
}

export interface IPostCategory {
  nome: string;
  situacao: boolean;
  updated_at: string;
  created_at: string;
  id: number;
}
