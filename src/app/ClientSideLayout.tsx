'use client'; // Chỉ cần sử dụng use client ở đây

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import SubMain from '~/components/layout/SubMain/SubMain';
// import SubMain from './components/SubMain';

interface ClientSideLayoutProps {
  children: ReactNode;
}

const excludedPaths = [
  '/projects/fresher-_-reactjs-fresher/files',
  '/projects/fresher-_-reactjs-fresher/settings',
  '/projects/fresher-_-reactjs-fresher/newissue',
  '/projects/fresher-_-reactjs-fresher/new_versions',
];

const ClientSideLayout: React.FC<ClientSideLayoutProps> = ({ children }) => {
  const path = usePathname(); // Lấy URL hiện tại
  const isProjectPath =
    path.startsWith('/projects') && !excludedPaths.includes(path);

  return (
    <div className="flex justify-between mt-2">
      <main
        className={`${isProjectPath ? 'w-3/4' : 'w-full'} p-2 border-1 border-solid border-primary-border bg-white h-full min-h-615`}
      >
        {children}
      </main>
      {isProjectPath && <SubMain />}{' '}
    </div>
  );
};

export default ClientSideLayout;
