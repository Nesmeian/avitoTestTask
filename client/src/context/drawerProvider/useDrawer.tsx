import { ContextType } from '@/types/context';
import { createContext, useContext } from 'react';

export const DrawerContext = createContext<ContextType | null>(null);
export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx)
    throw new Error('useDrawer должен использоваться внутри <ModalProvider>');
  return ctx;
};
