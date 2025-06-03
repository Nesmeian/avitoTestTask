import { useMediaQuery } from '@chakra-ui/react';

const useBreakpoints = () => {
  const [isTablet] = useMediaQuery('(max-width: 800px)', { ssr: true });

  return {
    isTablet,
  };
};

export default useBreakpoints;
