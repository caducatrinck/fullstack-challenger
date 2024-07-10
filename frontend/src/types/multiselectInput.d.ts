/* eslint-disable no-restricted-syntax */

export interface IMultiSelectInputProps {
  id: string;
  label: string;
  modelValue: string[];
  error?: string;
  options: Array<{ value: string; text: string }>;
}
