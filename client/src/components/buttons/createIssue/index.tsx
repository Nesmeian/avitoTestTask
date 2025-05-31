import { IssueForm } from '@/components/forms/IssueForm/IssueForm';
import { useModal } from '@/context/modalProvider/useModal';
import { Button } from '@chakra-ui/react';

export const CreateIssue = () => {
  const { open, close } = useModal();

  const handleClick = () => {
    open(<IssueForm onClose={close} />);
  };

  return <Button onClick={handleClick}>Создать задачу</Button>;
};
