import { Skeleton } from '@aafiyah/ui';

import React from 'react';

const Loading = () => {
  return (
    <div className="shadow-box bg-white font-roboto">
      <h4 className="border-b py-5 px-8 font-medium text-xl">
        <Skeleton className="h-5 w-20" />
      </h4>
      <div className="p-8 max-w-lg w-full">
        <div className="space-y-4 pb-8">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-8 w-52" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
