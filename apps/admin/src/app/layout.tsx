import type { Metadata } from "next";
import "../styles/globals.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { Poppins } from "next/font/google";
import RootLayoutWrapper from "@/layouts";

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
      <body className={poppins.className}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
