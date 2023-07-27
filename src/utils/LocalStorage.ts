export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const isItemInLocalStorage = (key: string): boolean => {
  return localStorage.getItem(key) !== null;
};

export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};
