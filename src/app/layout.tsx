'use client';

import store from '~/store/store';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Provider } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import { ReduxProvider } from './providers/ReduxProvider';

import SubMain from './components/SubMain/SubMain';
// import useIsProjectPath from '~/utils/useIsProjectPath';

import { usePathname } from 'next/navigation';
import ClientSideLayout from './ClientSideLayout';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata: Metadata = {
//   title: 'NTQ Redmine',
//   description: 'Generated by NTQ Redmine',
// };

const excludedPaths = [
  '/projects/fresher-_-reactjs-fresher/files',
  '/projects/fresher-_-reactjs-fresher/settings',
  '/projects/fresher-_-reactjs-fresher/newissue',
  '/projects/fresher-_-reactjs-fresher/new_versions',
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname(); // Lấy đường dẫn hiện tại
  const isProjectPath =
    path.startsWith('/projects') && !excludedPaths.includes(path);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div className="mx-3 min-w-max w-[calc(100%-24px)]">
            <Header title="hi" />
            <ClientSideLayout>{children}</ClientSideLayout>{' '}
            {/* Chỉ phần này là client-side */}
            <Footer />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
