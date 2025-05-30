import { ReactNode } from 'react';

export type ModalContextType = {
  open: (content: ReactNode) => void;
  close: () => void;
};
