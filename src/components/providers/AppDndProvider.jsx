import { useState } from "react";
import { DndContext, DragOverlay, rectIntersection } from "@dnd-kit/core";
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

    console.log("---- DRAG END ----");
    console.log("active:", active);
    console.log("over:", over);
    console.log("over?.id:", over?.id);
    console.log("over?.data?.current:", over?.data?.current);
    console.log("------------------");

    setActiveTask(null);
    setActiveBoardId(null);

    if (!over) return;

    const taskId = active.id;
    const fromBoardId = active.data.current.boardId;
    const fromStatus = active.data.current.task.status;

    const overType = over.data?.current?.type;

    // 1) DROP SOBRE UNA COLUMNA
    if (overType === "column") {
      const toBoardId = over.data.current.boardId;

      const newStatus = over.id.split("-")[1];

      if (toBoardId === fromBoardId) {
        onMoveTask(fromBoardId, taskId, newStatus);
        return;
      }

      onMoveTaskToBoard(fromBoardId, toBoardId, taskId, newStatus);
      return;
    }

    // 2) DROP SOBRE UN BOARD (sidebar o top bar)
    if (overType === "board") {
      const toBoardId = over.data.current.boardId;

      if (toBoardId !== fromBoardId) {
        onMoveTaskToBoard(fromBoardId, toBoardId, taskId, fromStatus);
      }

      return;
    }
  }

  return (
    <DndContext
      collisionDetection={rectIntersection}   // 👈🔥 FIX DEFINITIVO
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