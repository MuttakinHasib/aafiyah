import { AccountNavigation } from "@/components";
import { QueryClient } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const AccountLayout = async (props: PropsWithChildren) => {
  // const cookie = getCookieString('connect.sid');
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ['me'],
  //   queryFn: async () =>
  //     await fetch(`${baseURL}/users/me`, {
  //       credentials: 'include',
  //       headers: { cookie },
  //     }),
  // });

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
