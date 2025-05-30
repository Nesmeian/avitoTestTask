import { DrawerContextType } from '@/types/context';
import { createContext, useContext } from 'react';

export const DrawerContext = createContext<DrawerContextType | null>(null);
export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx)
    throw new Error('useDrawer должен использоваться внутри <DrawerProvider>');
  return ctx;
};
