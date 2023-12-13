'use server';

import { cookies } from 'next/headers';

export const getCookieString = (name: string) => {
  const cookie = cookies().get(name);

  if (!cookie) {
    return '';
  }

  return `${cookie?.name}=${cookie?.value};`;
};
