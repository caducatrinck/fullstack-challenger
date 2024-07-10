/* eslint-disable no-restricted-syntax */

export interface IApiReturn<T> {
  statusCode: number;
  message: string;
  data: T;
}
interface ICustomError extends Error {
  statusCode?: number;
}
export interface IApiErroReturn extends Error {
  statusCode: number;
  message: string;
  data: null;
}
