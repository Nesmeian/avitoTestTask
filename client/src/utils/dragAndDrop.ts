import { ColumnsState } from '@/types/storeTypes';
import { UseTaskDragAndDropProps } from '@/types/utilsTypes';
import { DropResult } from '@hello-pangea/dnd';

export const useTaskDragAndDrop = ({
  columns,
  setColumns,
  updateTaskStatus,
}: UseTaskDragAndDropProps) => {
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    const sourceCol = source.droppableId as keyof ColumnsState;
    const destCol = destination.droppableId as keyof ColumnsState;
    const taskId = Number(draggableId);

    const sourceTasks = Array.from(columns[sourceCol]);
    const movedIndex = sourceTasks.findIndex((t) => t.id === taskId);
    if (movedIndex === -1) return;
    const [movedTask] = sourceTasks.splice(movedIndex, 1);

    const destTasks = Array.from(columns[destCol]);
    destTasks.splice(destination.index, 0, { ...movedTask, status: destCol });

    setColumns((prev) => ({
      ...prev,
      [sourceCol]: sourceTasks,
      [destCol]: destTasks,
    }));

    try {
      await updateTaskStatus({
        id: taskId,
        status: destCol,
      });
    } catch (err) {
      setColumns((prev) => {
        const rollbackDest = Array.from(prev[destCol]);
        const rollbackSource = Array.from(prev[sourceCol]);

        const idxInDest = rollbackDest.findIndex((t) => t.id === taskId);
        if (idxInDest !== -1) rollbackDest.splice(idxInDest, 1);

        rollbackSource.splice(source.index, 0, movedTask);

        return {
          ...prev,
          [sourceCol]: rollbackSource,
          [destCol]: rollbackDest,
        };
      });
      console.error('Не удалось поменять статус задачи:', err);
    }
  };

  return handleDragEnd;
};
