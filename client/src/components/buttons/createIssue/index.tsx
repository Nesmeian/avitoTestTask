import { IssueForm } from '@/components/forms/IssueForm/IssueForm';
import { useDrawer } from '@/context/modalProvider/useModal';
import { Button } from '@chakra-ui/react';

export const CreateIssue = () => {
  const { open } = useDrawer();

  const handleClick = () => {
    open(<IssueForm />);
  };

  return <Button onClick={handleClick}>Создать задачу</Button>;
};
