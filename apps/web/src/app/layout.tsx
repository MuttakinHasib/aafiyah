import { Analytics } from "@vercel/analytics/react";
import { StyledComponentsRegistry } from "./registry";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "animate.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/global.css";

import { Roboto } from "next/font/google";
import RootLayoutWrapper from "./components/wrapper.layout";

import { Toaster } from "react-hot-toast";
import { defaultMetadata } from "@/seo";
import { ReactQueryProviders } from "@/providers";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProviders>
          <StyledComponentsRegistry>
            <MantineProvider theme={{ fontFamily: roboto.style.fontFamily }}>
              <RootLayoutWrapper>
                <Analytics />
                {children}
                <Toaster position="top-right" />
              </RootLayoutWrapper>
            </MantineProvider>
          </StyledComponentsRegistry>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
