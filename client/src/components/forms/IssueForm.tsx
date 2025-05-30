import {
  Button,
  chakra,
  FormControl,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Menu } from '../ui/menu';

export const IssueForm = () => {
  const projects = ['проект a', 'проект б', 'проект c', 'проект д'];
  const priority = ['Low', 'Medium', 'High'];
  const status = ['Todo', 'In Progress', 'Completed'];
  const assigned = [
    'Исполнитель 1',
    'Исполнитель 2',
    'Исполнитель 3',
    'Исполнитель 4',
  ];
  return (
    <VStack alignItems="start" h="100%">
      <Heading as="h3" size="lg">
        Создание рецепта
      </Heading>
      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        width="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={4}
        p={4}
        borderRadius="md"
      >
        <VStack>
          <FormControl>
            <Input placeholder="Название" />
          </FormControl>
          <Textarea placeholder="Описание" />
          <Menu title="Проект" list={projects}></Menu>
          <Menu title="Приоритет" list={priority}></Menu>
          <Menu title="Статус" list={status}></Menu>
          <Menu title="Исполнитель" list={assigned}></Menu>
        </VStack>
        <Button>Создать</Button>
      </chakra.form>
    </VStack>
  );
};
