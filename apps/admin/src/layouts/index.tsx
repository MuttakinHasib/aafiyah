import React, { PropsWithChildren } from 'react';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';

const RootLayoutWrapper = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-72">
        <Header />
        <div className="px-16 py-10">{props.children}</div>
      </div>
    </main>
  );
};

export default RootLayoutWrapper;
