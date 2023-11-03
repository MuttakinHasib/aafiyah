import { baseURL } from '@aafiyah/client';
import { AccountNavigation } from '@aafiyah/ui';
import { QueryClient } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

const AccountLayout = async (props: PropsWithChildren) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: async () =>
      await fetch(`${baseURL}/users/me`).then((res) => res.json()),
  });

  return (
    <div className="bg-gray-100">
      <div className="container xl:max-w-7xl w-full py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 shadow-header bg-white flex lg:block overflow-auto">
          <AccountNavigation />
        </div>
        <div className="lg:col-span-9">{props.children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
