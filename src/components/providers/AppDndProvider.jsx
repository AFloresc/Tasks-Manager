import { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import TaskCard from "../TaskCard";

export default function AppDndProvider({
  children,
  onMoveTask,
  onMoveTaskToBoard
}) {
  const [activeTask, setActiveTask] = useState(null);
  const [activeBoardId, setActiveBoardId] = useState(null);

  function handleDragStart(event) {
    const data = event.active.data.current;
    if (!data) return;

    setActiveTask(data.task);
    setActiveBoardId(data.boardId);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    setActiveTask(null);
    setActiveBoardId(null);

    if (!over) return;

    const taskId = active.id;
    const fromBoardId = active.data.current.boardId;
    const fromStatus = active.data.current.task.status;

    const overType = over.data?.current?.type;
    const toBoardId = over.data?.current?.boardId;

    // 1) MOVER ENTRE COLUMNAS DEL MISMO BOARD
    if (overType === "column" && toBoardId === fromBoardId) {
      const newStatus = over.id;
      onMoveTask(fromBoardId, taskId, newStatus);
      return;
    }

    // 2) MOVER A OTRO BOARD
    if (overType === "board") {
      const newStatus = fromStatus;
      onMoveTaskToBoard(fromBoardId, toBoardId, taskId, newStatus);
      return;
    }

    // 3) MOVER A UNA COLUMNA DE OTRO BOARD
    if (overType === "column" && toBoardId !== fromBoardId) {
      const newStatus = over.id;
      onMoveTaskToBoard(fromBoardId, toBoardId, taskId, newStatus);
      return;
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}   // 👈 SOLUCIÓN
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}

      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} boardId={activeBoardId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}