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
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

export default theme;
