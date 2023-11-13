import React, { PropsWithChildren } from 'react';
import { Sidebar } from '../components/sidebar';
import { Header } from '../components/header';

const RootLayoutWrapper = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen">
      <Sidebar />
      <div className="ml-72">
        <Header />
        {props.children}
      </div>
    </main>
  );
};

export default RootLayoutWrapper;
