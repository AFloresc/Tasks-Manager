import { useState } from "react";
import { Box } from "@mui/material";
import { DndContext } from "@dnd-kit/core";

import SidebarBoards from "./components/SideBarBoards";
import NewBoardModal from "./components/NewBoardModal";
import BoardView from "./components/BoardView";
import TaskModal from "./components/TaskModal";

// Mock inicial
const initialBoards = [
  {
    id: "b1",
    name: "Design Board",
    icon: "🎨",
    tasks: [
      { id: "t1", title: "Investigate Framer Motion", tags: ["Concept"], status: "backlog", priority: "low" },
      { id: "t2", title: "Implement CRUD operations", tags: ["Technical"], status: "backlog", priority: "critical" },
      { id: "t3", title: "Edit tasks", tags: ["Technical", "Front-end"], status: "inProgress", priority: "high" },
      { id: "t4", title: "View subset of tasks", tags: ["Technical", "Front-end"], status: "inProgress", priority: "normal" },
      { id: "t5", title: "Delete tasks", tags: ["Technical", "Front-end"], status: "inReview", priority: "high" },
      { id: "t6", title: "Add tasks", tags: ["Technical", "Front-end"], status: "inReview", priority: "normal" },
      { id: "t7", title: "Basic App structure", tags: ["Technical", "Front-end"], status: "completed", priority: "high" },
      { id: "t8", title: "Design Todo App", tags: ["Design"], status: "completed", priority: "low" }
    ]
  },
  {
    id: "b2",
    name: "Learning Board",
    icon: "📚",
    tasks: [
      { id: "t9", title: "Learn Zustand", tags: ["Technical"], status: "backlog", priority: "high" },
      { id: "t10", title: "Practice TypeScript", tags: ["Technical"], status: "inProgress", priority: "normal" }
    ]
  }
];

export default function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [activeBoardId, setActiveBoardId] = useState("b1");

  const [openNewBoard, setOpenNewBoard] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const [sortMode, setSortMode] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");

  const activeBoard = boards.find((b) => b.id === activeBoardId);

  // Evitar errores si activeBoard es null
  const filteredBoard = activeBoard
    ? {
        ...activeBoard,
        tasks: activeBoard.tasks.filter((task) => {
          const q = searchQuery.toLowerCase();
          return (
            task.title.toLowerCase().includes(q) ||
            task.tags.some((t) => t.toLowerCase().includes(q)) ||
            task.priority.toLowerCase().includes(q)
          );
        })
      }
    : null;

  // Mover tarea dentro del mismo board (entre columnas)
  const handleMoveTask = (taskId, newStatus, boardId) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
              )
            }
          : board
      )
    );
  };

  // Mover tarea entre boards
  const handleMoveTaskToBoard = (taskId, fromBoardId, toBoardId) => {
    let movedTask = null;

    // 1. Sacar la tarea del board origen
    const boardsWithoutTask = boards.map((board) => {
      if (board.id !== fromBoardId) return board;

      const remaining = board.tasks.filter((t) => {
        if (t.id === taskId) {
          movedTask = t;
          return false;
        }
        return true;
      });

      return { ...board, tasks: remaining };
    });

    if (!movedTask) return;

    // 2. Añadirla al board destino
    const updatedBoards = boardsWithoutTask.map((board) =>
      board.id === toBoardId
        ? { ...board, tasks: [...board.tasks, { ...movedTask, status: "backlog" }] }
        : board
    );

    setBoards(updatedBoards);
    setActiveBoardId(toBoardId);
  };

  return (
    <DndContext
      onDragEnd={(event) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        const fromBoardId = active.data.current.boardId;

        // Drop sobre otro board
        if (over.id.startsWith("board-")) {
          const toBoardId = over.id.replace("board-", "");
          if (fromBoardId !== toBoardId) {
            handleMoveTaskToBoard(taskId, fromBoardId, toBoardId);
          }
          return;
        }

        // Drop sobre columna del mismo board
        handleMoveTask(taskId, over.id, fromBoardId);
      }}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SidebarBoards
          boards={boards}
          activeBoardId={activeBoardId}
          onSelectBoard={setActiveBoardId}
          onOpenNewBoard={() => setOpenNewBoard(true)}
        />

        {filteredBoard && (
          <BoardView
            board={filteredBoard}
            sortMode={sortMode}
            onChangeSortMode={setSortMode}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onOpenTask={(task) => {
              setSelectedTask(task);
              setOpenTaskModal(true);
            }}
          />
        )}

        <NewBoardModal
          open={openNewBoard}
          onClose={() => setOpenNewBoard(false)}
          onCreate={({ name, icon }) => {
            const newBoard = { id: crypto.randomUUID(), name, icon, tasks: [] };
            setBoards([...boards, newBoard]);
            setActiveBoardId(newBoard.id);
          }}
        />

        <TaskModal
          open={openTaskModal}
          task={selectedTask}
          onClose={() => setOpenTaskModal(false)}
          onSave={(updatedTask) => {
            setBoards((prev) =>
              prev.map((board) =>
                board.id === activeBoardId
                  ? {
                      ...board,
                      tasks: board.tasks.map((t) =>
                        t.id === updatedTask.id ? updatedTask : t
                      )
                    }
                  : board
              )
            );
          }}
        />
      </Box>
    </DndContext>
  );
}