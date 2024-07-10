/* eslint-disable no-restricted-syntax */

import type { InputTypeHTMLAttribute } from 'vue';

export interface ICustonInputProps {
  modelValue: string;
  label: string;
  placeholder?: string;
  type?: InputTypeHTMLAttribute;
  id: string;
  error?: string;
}
