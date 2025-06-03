import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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

  components: {
    Button: {
      variants: {
        primary: {
          bg: 'gray.800',
          color: 'white',
          transition: '0.2s',
          _hover: {
            bg: 'gray.900',
            border: '3px solid',
            borderColor: 'white',
            color: 'gray.100',
          },
          _invalid: {
            border: '6px solid',
            borderColor: 'red.500',
            boxShadow: '0 0 0 1px red.600',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
  },
});

export default theme;
