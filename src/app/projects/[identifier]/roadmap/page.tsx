'use client';

import { usePathname } from 'next/navigation';
import RoadmapPage from '~/components/features/projects/roadmap';

const Roadmap: React.FC = () => {
  const pathname = usePathname();
  const identifier = pathname.split('/')[2];
  return <RoadmapPage identifier={identifier} />;
};

export default Roadmap;
