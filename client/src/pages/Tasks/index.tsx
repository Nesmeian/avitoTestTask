import { Loader } from '@/components/ui/loader';
import { useGetTasksQuery } from '@/query/get';
import { Heading, HStack, VStack } from '@chakra-ui/react';

export const Tasks = () => {
  const { data, isLoading } = useGetTasksQuery();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <VStack>
      {data?.data &&
        data?.data.map((e) => (
          <VStack>
            <HStack>
              <Heading fontSize="12px">{e.title}</Heading>
            </HStack>
          </VStack>
        ))}
    </VStack>
  );
};
