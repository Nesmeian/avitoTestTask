import { ReactNode } from 'react';

export type ContextType = {
  open: (content: ReactNode) => void;
  close: () => void;
  isOpen?: boolean;
};
