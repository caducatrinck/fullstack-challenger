export const validateEmail = (value: string): boolean => {
  if (!/\S+@\S+\.\S+/.test(value)) {
    return false;
  }
  return true;
};
