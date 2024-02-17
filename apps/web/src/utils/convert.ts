type Filter = { [key: string]: string | string[] };

export function ensureArrayValues<T = Filter>(filters: Filter): T {
  const result: Filter = {};

  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      result[key] = filters[key]; // If it's already an array, keep it as is
    } else {
      result[key] = [filters[key] as string]; // Convert string value to array
    }
  }

  return result as T;
}
