"use client";

import React, { PropsWithChildren } from "react";
import { useMedia } from "react-use";
import NextTopLoader from "nextjs-toploader";
import { Footer, Header, MobileHeader } from "@/components";

const RootLayoutWrapper = (props: PropsWithChildren) => {
  const isDesktop = useMedia("(min-width: 1200px)");
  return (
    <React.Fragment>
      <NextTopLoader color="#ff3366" />
      {isDesktop ? <Header /> : <MobileHeader />}
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default RootLayoutWrapper;
