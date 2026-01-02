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

    // -----------------------------------------
    // 1) DROP SOBRE UNA COLUMNA
    // -----------------------------------------
    if (overType === "column") {
      const toBoardId = over.data.current.boardId;

      // Extraemos el status real desde "boardId-status"
      const newStatus = over.id.split("-")[1];

      // MISMO BOARD → mover dentro del board
      if (toBoardId === fromBoardId) {
        onMoveTask(fromBoardId, taskId, newStatus);
        return;
      }

      // OTRO BOARD → mover entre boards
      onMoveTaskToBoard(fromBoardId, toBoardId, taskId, newStatus);
      return;
    }

    // -----------------------------------------
    // 2) DROP SOBRE EL BOARD (top bar)
    // -----------------------------------------
    if (overType === "board") {
      // Extraemos el boardId real desde "board-<id>"
      const toBoardId = over.id.replace("board-", "");

      // Si es otro board → mover manteniendo el status
      if (toBoardId !== fromBoardId) {
        onMoveTaskToBoard(fromBoardId, toBoardId, taskId, fromStatus);
      }

      return;
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
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
