import { v5 } from 'uuid';

export const makeId = (...strings: string[]) => {
  const newStrings = [...strings, new Date().toISOString()];
  const uuidName = newStrings.reduce((acc, string) => acc + string, '');
  return v5(uuidName, v5.URL);
};
