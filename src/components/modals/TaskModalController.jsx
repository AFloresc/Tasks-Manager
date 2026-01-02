import { useState } from "react";
import TaskModal from "../TaskModal";

export default function TaskModalController({ onSave, onCreate, children }) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(null);
  const [boardId, setBoardId] = useState(null);

  // Abre el modal con una tarea (existente o nueva)
  const openTask = (taskData, boardIdValue) => {
    setTask(taskData);
    setBoardId(boardIdValue);
    setOpen(true);
  };

  const closeTask = () => {
    setOpen(false);
    setTask(null);
    setBoardId(null);
  };

  const handleSave = (partialTask) => {
    if (task?.id) {
      // EDITAR: mezclamos la tarea original con lo que viene del modal
      const fullTask = {
        ...task,
        ...partialTask,
        updatedAt: new Date().toISOString()
      };

      onSave(boardId, fullTask);
    } else {
      // CREAR: usamos el boardId actual y lo que viene del modal
      onCreate(boardId, partialTask);
    }

    closeTask();
  };

  return (
    <>
      {open && (
        <TaskModal
          open={open}
          task={task}
          onClose={closeTask}
          onSave={handleSave}
        />
      )}

      {typeof children === "function" ? children({ openTask }) : null}
    </>
  );
}