// src/components/Activity.tsx
'use client';

import { usePathname } from 'next/navigation';
import ActivityPage from '~/components/features/projects/activity';

const Activity: React.FC = () => {
  const pathname = usePathname();
  const identifier = pathname.split('/')[2];

  return <ActivityPage identifier={identifier} />;
};

export default Activity;
