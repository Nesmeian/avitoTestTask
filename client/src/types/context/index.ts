import { ReactNode } from 'react';

export type DrawerContextType = {
  open: (content: ReactNode) => void;
  close: () => void;
};
