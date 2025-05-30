import { ModalContextType } from '@/types/context';
import { createContext, useContext } from 'react';

export const ModalContext = createContext<ModalContextType | null>(null);
export const useDrawer = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error('useDrawer должен использоваться внутри <DrawerProvider>');
  return ctx;
};
