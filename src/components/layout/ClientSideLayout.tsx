'use client'; // Chỉ cần sử dụng use client ở đây

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import SubMain from '~/components/layout/SubMain/SubMain';
import { EXCLUDEDPATHS } from '~/const/MagicConstant';
// import SubMain from './components/SubMain';

interface ClientSideLayoutProps {
  children: ReactNode;
}

const ClientSideLayout: React.FC<ClientSideLayoutProps> = ({ children }) => {
  const path = usePathname(); // Lấy URL hiện tại
  const isProjectPath =
    path.startsWith('/projects') && !EXCLUDEDPATHS.includes(path);

  return (
    <div className="flex justify-between mt-2">
      <main
        className={`${isProjectPath ? 'w-3/4' : 'w-full'} p-2 border-1 border-solid border-gray-300 bg-white h-full min-h-615`}
      >
        {children}
      </main>
      {isProjectPath && <SubMain />}{' '}
    </div>
  );
};

export default ClientSideLayout;
