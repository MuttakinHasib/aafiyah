import React, { PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { Footer, Header, MobileHeader } from "@/components";

const RootLayoutWrapper = (props: PropsWithChildren) => {
  return (
    <React.Fragment>
      <NextTopLoader color="#ff3366" />
      <Header /> <MobileHeader />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default RootLayoutWrapper;
