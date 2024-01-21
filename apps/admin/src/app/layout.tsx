import type { Metadata } from "next";
import "../styles/globals.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@mantine/core/styles.css";

import { Poppins } from "next/font/google";
import RootLayoutWrapper from "@/layouts";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aafiyah | Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={poppins.className}>
        <MantineProvider>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
