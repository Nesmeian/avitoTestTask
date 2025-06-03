import { VStack } from '@chakra-ui/react';
import { TaskList } from '../../components/features/taskListIssues/taskList';

import { CreateIssue } from '@/components/buttons/createIssue';
import { useSelector } from 'react-redux';
import { ApplicationState } from '@/store/configure-store';
import useBreakpoints from '@/themes/breakPoints';
import { ControlPanel } from '@/components/controlPanel';

export const Tasks = () => {
  const tasks = useSelector((state: ApplicationState) => state.Tasks.tasks);
  const { isTablet } = useBreakpoints();
  return (
    <VStack width="100%" gap="30px">
      {!isTablet && <ControlPanel />}
      <TaskList tasks={tasks} />
      <CreateIssue />
    </VStack>
  );
};
