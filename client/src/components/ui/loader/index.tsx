import { Box, Spinner } from '@chakra-ui/react';
import { loaderWrapperStyles } from './style';

export const Loader = () => (
  <Box {...loaderWrapperStyles}>
    <Spinner size="xl" thickness="4px" color="black" />
  </Box>
);
