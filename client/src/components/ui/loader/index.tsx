import { Box, Center, Spinner } from '@chakra-ui/react';
import { loaderOverlayStyles, loaderWrapperStyles } from './style';

export const Loader = () => (
  <Center {...loaderOverlayStyles}>
    <Box {...loaderWrapperStyles}>
      <Spinner size="xl" thickness="4px" color="black" />
    </Box>
  </Center>
);
