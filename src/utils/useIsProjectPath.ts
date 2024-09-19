'use client';

import { usePathname } from 'next/navigation';

export const useIsProjectPath = (excludedPaths: string[]) => {
  const pathname = usePathname();
  const isProjectPath =
    pathname.startsWith('/projects') && !excludedPaths.includes(pathname);

  return isProjectPath;
};
