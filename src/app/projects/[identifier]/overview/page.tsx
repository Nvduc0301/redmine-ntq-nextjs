'use client';

import { usePathname } from 'next/navigation';
import OverviewPage from '~/components/features/projects/overview';

const Overview: React.FC = () => {
  const pathname = usePathname();
  const identifier = pathname.split('/')[2];

  return <OverviewPage identifier={identifier} />;
};

export default Overview;
