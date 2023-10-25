
import { StyledComponentsRegistry } from './registry';
import '../styles/global.css';
import 'animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Roboto } from 'next/font/google';
import RootLayoutWrapper from './components/wrapper.layout';
import { defaultMetadata } from '@aafiyah/ui';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = defaultMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
