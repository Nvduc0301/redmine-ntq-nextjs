'use client';

import { usePathname } from 'next/navigation';
import SettingsPage from '~/components/features/projects/settings';

const Settings: React.FC = () => {
  const pathname = usePathname();
  const identifier = pathname.split('/')[2];
  return <SettingsPage identifier={identifier} />;
};

export default Settings;
