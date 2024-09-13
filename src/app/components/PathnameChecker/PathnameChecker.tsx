// components/ProjectPathChecker.tsx
'use client';

import { usePathname } from 'next/navigation';

interface ProjectPathCheckerProps {
  excludedPaths: string[];
  render: (isProjectPath: boolean) => React.ReactNode;
}

export default function ProjectPathChecker({
  excludedPaths,
  render,
}: ProjectPathCheckerProps) {
  const pathname = usePathname();
  const isProjectPath =
    pathname.startsWith('/projects') && !excludedPaths.includes(pathname);

  return <>{render(isProjectPath)}</>;
}
