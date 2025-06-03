import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
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
    <DrawerContext.Provider value={{ open, close, isOpen }}>
      {children}

      <Drawer isOpen={isOpen} onClose={close} size={{ md: 'lg', base: 'sm' }}>
        <DrawerOverlay />
        <DrawerContent
          h="400px"
          borderRadius="12px"
          boxShadow="0 0 15px rgba(0,0,0,0.1)"
          p={{ base: '40px' }}
          m={{ base: '20px' }}
          mt="80px"
        >
          {content}
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
};
