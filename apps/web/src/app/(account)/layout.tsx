import { AccountNavigation } from '@aafiyah/ui';
import React, { PropsWithChildren } from 'react';

const AccountLayout = (props: PropsWithChildren) => {
  return (
    <div className="bg-gray-100">
      <div className="container max-w-6xl w-full py-16 grid grid-cols-12 gap-12">
        <div className="lg:col-span-3 shadow-header bg-white">
          <AccountNavigation />
        </div>
        <div className="lg:col-span-9">{props.children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
