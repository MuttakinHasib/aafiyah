import { Skeleton } from '@aafiyah/ui';
import React from 'react';

const Loading = () => {
  return (
    <div className="relative p-8 shadow-box bg-white w-[calc((100%_-_0px_-_1px)_/_1)] md:w-[calc((100%_-_16px_-_1px)_/_2)] lg:w-[calc((100%_-_32px_-_1px)_/_3)] space-y-3">
      <div className="absolute top-0 right-0">
        <Skeleton className="h-5 w-16 rounded-none" />
      </div>
      <Skeleton className="h-5 w-20" />
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-14" />{' '}
            <Skeleton className="h-5 w-full" />
          </div>
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
};

export default Loading;
