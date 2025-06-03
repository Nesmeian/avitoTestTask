import { NavigationButtons } from '@/components/buttons/headerButtons/NavigationButtons';
import { ControlPanel } from '@/components/controlPanel';
import { BreadCrumbs } from '@/components/ui/breadCrumbs';
import { VStack } from '@chakra-ui/react';

export const BurgerMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <VStack alignItems="flex-start" gap="20px" h="100%" overflowY="scroll">
      <BreadCrumbs />
      <NavigationButtons onClose={onClose} />
      <ControlPanel isDrawer />
    </VStack>
  );
};
