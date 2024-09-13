'use client'; // Đây là Client Component vì chúng ta dùng React hooks

import { Provider } from 'react-redux';
import store from '~/store/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
