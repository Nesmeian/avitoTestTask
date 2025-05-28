import { HStack } from '@chakra-ui/react';
import { headerStyles } from './style';

import { CreateIssue } from '@/components/buttons/headerButtons/CreateIssue';
import { NavigationButtons } from '@/components/buttons/headerButtons/NavigationButtons';
export const Header = () => {
  return (
    <HStack as="header" {...headerStyles}>
      <NavigationButtons />
      <CreateIssue />
    </HStack>
  );
};
