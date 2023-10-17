import { Footer, Header } from '@aafiyah/ui';
import React, { PropsWithChildren } from 'react';

const PublicLayout = (props: PropsWithChildren) => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default PublicLayout;
