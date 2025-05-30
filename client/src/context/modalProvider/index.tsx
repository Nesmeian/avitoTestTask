import { ReactNode, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ModalContext } from './useModal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
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
    <ModalContext.Provider value={{ open, close }}>
      {children}

      <Modal
        isOpen={isOpen}
        onClose={close}
        size={{ lg: 'lg', base: 'sm' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="12px"
          boxShadow="0 0 15px rgba(0,0,0,0.1)"
          p={{ base: '40px' }}
          m={{ base: '20px' }}
        >
          {content}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};
