import { IssueForm } from '@/components/forms/IssueForm/IssueForm';
import { useDrawer } from '@/context/drawerProvider/useDrawer';
import { Button } from '@chakra-ui/react';

export const CreateIssue = () => {
  const { open } = useDrawer();

  const handleClick = () => {
    open(<IssueForm />);
  };

  return <Button onClick={handleClick}>Создать задачу</Button>;
};
