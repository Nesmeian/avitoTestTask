import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '::-webkit-scrollbar': {
        display: 'none',
      },
      '*': {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      },
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
});

export default theme;
