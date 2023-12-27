export const fallbackName = (name = '') =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('');
