import { HStack } from '@chakra-ui/react';
import { headerStyles } from './style';

import { CreateIssue } from '@/components/buttons/headerButtons/CreateIssue';
import { NavigationButtons } from '@/components/buttons/headerButtons/NavigationButtons';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
export const Header = () => {
  return (
    <HStack as="header" {...headerStyles}>
      <HStack gap="24px">
        <NavigationButtons />
        <BreadCrumbs />
      </HStack>
      <CreateIssue />
    </HStack>
  );
};
