'use client';

import { Footer, Header, MobileHeader } from '@aafiyah/ui';
import React, { PropsWithChildren } from 'react';
import { useMedia } from 'react-use';

const PublicLayout = (props: PropsWithChildren) => {
  const isDesktop = useMedia('(min-width: 1200px)');
  return (
    <React.Fragment>
      {isDesktop ? <Header /> : <MobileHeader />}
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default PublicLayout;
