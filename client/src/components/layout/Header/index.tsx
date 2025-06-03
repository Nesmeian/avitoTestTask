import { Box, HStack } from '@chakra-ui/react';
import { headerStyles } from './style';

import { CreateIssue } from '@/components/buttons/createIssue';
import { NavigationButtons } from '@/components/buttons/headerButtons/NavigationButtons';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { useDrawer } from '@/context/drawerProvider/useDrawer';
import useBreakpoints from '@/themes/breakPoints';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { BurgerMenu } from '../burgerMenu';
export const Header = () => {
  const { open, isOpen, close } = useDrawer();
  const { isTablet } = useBreakpoints();
  const toggleMenu = () => {
    if (isOpen) {
      close();
    } else {
      open(<BurgerMenu onClose={close} />);
    }
  };
  return (
    <HStack
      as="header"
      {...headerStyles}
      background={isOpen ? 'white' : '#ffffd3'}
    >
      {!isTablet && (
        <HStack gap="24px">
          <NavigationButtons />
          <BreadCrumbs />
        </HStack>
      )}
      {!isTablet && <CreateIssue />}
      {isTablet && (
        <Box onClick={toggleMenu} cursor="pointer" p="20px">
          {isOpen ? (
            <CloseIcon boxSize="16px" />
          ) : (
            <HamburgerIcon boxSize="16px" />
          )}
        </Box>
      )}
    </HStack>
  );
};
