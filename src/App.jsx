import { useState } from "react";
import { Box } from "@mui/material";

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
      {
        id: "t1",
        title: "Investigate Framer Motion",
        tags: ["Concept"],
        status: "backlog",
        priority: "low"
      },
      {
        id: "t2",
        title: "Implement CRUD operations",
        tags: ["Technical"],
        status: "backlog",
        priority: "critical"
      },
      {
        id: "t3",
        title: "Edit tasks",
        tags: ["Technical", "Front-end"],
        status: "inProgress",
        priority: "high"
      },
      {
        id: "t4",
        title: "View subset of tasks",
        tags: ["Technical", "Front-end"],
        status: "inProgress",
        priority: "normal"
      },
      {
        id: "t5",
        title: "Delete tasks",
        tags: ["Technical", "Front-end"],
        status: "inReview",
        priority: "high"
      },
      {
        id: "t6",
        title: "Add tasks",
        tags: ["Technical", "Front-end"],
        status: "inReview",
        priority: "normal"
      },
      {
        id: "t7",
        title: "Basic App structure",
        tags: ["Technical", "Front-end"],
        status: "completed",
        priority: "high"
      },
      {
        id: "t8",
        title: "Design Todo App",
        tags: ["Design"],
        status: "completed",
        priority: "low"
      }
    ]
  },
  {
    id: "b2",
    name: "Learning Board",
    icon: "📚",
    tasks: [
      {
        id: "t9",
        title: "Learn Zustand",
        tags: ["Technical"],
        status: "backlog",
        priority: "high"
      },
      {
        id: "t10",
        title: "Practice TypeScript",
        tags: ["Technical"],
        status: "inProgress",
        priority: "normal"
      }
    ]
  }
];

export default function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [activeBoardId, setActiveBoardId] = useState("b1");

  const [openNewBoard, setOpenNewBoard] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  // 👉 Ordenación global
  const [sortMode, setSortMode] = useState("priority"); // "priority" | "tag"

  const activeBoard = boards.find((b) => b.id === activeBoardId);

  // Crear nuevo board
  const handleCreateBoard = ({ name, icon }) => {
    const newBoard = {
      id: crypto.randomUUID(),
      name,
      icon,
      tasks: []
    };

    setBoards([...boards, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  // Guardar cambios en una tarea
  const handleSaveTask = (updatedTask) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
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
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SidebarBoards
        boards={boards}
        activeBoardId={activeBoardId}
        onSelectBoard={setActiveBoardId}
        onOpenNewBoard={() => setOpenNewBoard(true)}
      />

      {/* Vista del board activo */}
      <BoardView
        board={activeBoard}
        sortMode={sortMode}
        onChangeSortMode={setSortMode} 
        onOpenTask={(task) => {
          setSelectedTask(task);
          setOpenTaskModal(true);
        }}
      />

      {/* Modal: Crear nuevo board */}
      <NewBoardModal
        open={openNewBoard}
        onClose={() => setOpenNewBoard(false)}
        onCreate={handleCreateBoard}
      />

      {/* Modal: Editar tarea */}
      <TaskModal
        open={openTaskModal}
        task={selectedTask}
        onClose={() => setOpenTaskModal(false)}
        onSave={handleSaveTask}
      />
    </Box>
  );
}