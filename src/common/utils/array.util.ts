import { isEmail } from 'class-validator';

export const isItemEmail = (item: string) => isEmail(item);

export const isItemInArray = (array: string[]) => (item: string) =>
  array.includes(item);
