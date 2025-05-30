import { ReactNode, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { DrawerContext } from './useDrawer';

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<ReactNode>(null);

  const open = (node: ReactNode) => {
    setContent(node);
    onOpen();
  };

  const close = () => {
    onClose();
    setContent(null);
  };

  return (
    <DrawerContext.Provider value={{ open, close }}>
      {children}

      <Drawer isOpen={isOpen} onClose={close} size={{ lg: 'lg', base: 'sm' }}>
        <DrawerOverlay />
        <DrawerContent
          m="80px 20px 0 0"
          borderRadius="12px"
          boxShadow="-2px 0 15px rgba(0,0,0,0.1)"
          p={{ base: '40px' }}
        >
          {content}
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
};
