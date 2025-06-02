import { clearState } from '@/store/queryState';
import {
  Alert as AlertElem,
  AlertIcon,
  CloseButton,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
export const Alert = ({
  isSuccess,
  message,
}: {
  isSuccess: boolean;
  message: string;
}) => {
  const dispatch = useDispatch();
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
      dispatch(clearState());
    }, 13_000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, dispatch]);
  if (!isOpen) {
    return null;
  }
  const closeHandle = () => {
    dispatch(clearState());
    onClose();
  };
  const statusVariant = isSuccess ? 'success' : 'error';
  return (
    <AlertElem
      position="fixed"
      status={statusVariant}
      color="white"
      background={isSuccess ? '#38a169;' : ' #e53e3e'}
      left="50%"
      transform="translateX(-50%)"
      w={{ lg: '400px', base: '328px' }}
      zIndex={1000}
      bottom="100px"
    >
      <HStack>
        <AlertIcon color="white" />
        <Text>{message || 'unknown error try again later'}</Text>
        <CloseButton
          color="white"
          onClick={closeHandle}
          position="absolute"
          top="0px"
          right={0}
        />
      </HStack>
    </AlertElem>
  );
};
