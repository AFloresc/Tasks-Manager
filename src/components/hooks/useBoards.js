import { useState, useMemo, useEffect } from "react";

export function useBoards(initialBoards) {
  // Load from localStorage
  const loadBoards = () => {
    try {
      const saved = localStorage.getItem("boards");
      return saved ? JSON.parse(saved) : initialBoards;
    } catch (err) {
      console.error("Error loading boards:", err);
      return initialBoards;
    }
  };

  const [boards, setBoards] = useState(loadBoards);
  const [trash, setTrash] = useState([]);          // 👈 NUEVO
  const [activeBoardId, setActiveBoardId] = useState(
    loadBoards()[0]?.id || null
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const [sortMode, setSortMode] = useState("priority");
  const [searchQuery, setSearchQuery] = useState("");

  // SELECT ACTIVE BOARD
  const selectBoard = (boardId) => setActiveBoardId(boardId);

  const activeBoard = useMemo(
    () => boards.find((b) => b.id === activeBoardId) || null,
    [boards, activeBoardId]
  );

  // FILTER + SORT TASKS
  const filteredBoard = useMemo(() => {
    if (!activeBoard) return null;

    const q = searchQuery.toLowerCase();

    const filteredTasks = activeBoard.tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(q) ||
        task.tags.some((t) => t.toLowerCase().includes(q)) ||
        task.priority.toLowerCase().includes(q)
      );
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortMode === "priority") {
        const order = { critical: 1, high: 2, normal: 3, low: 4 };
        return order[a.priority] - order[b.priority];
      }
      if (sortMode === "title") return a.title.localeCompare(b.title);
      if (sortMode === "createdAt")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortMode === "updatedAt")
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      return 0;
    });

    return { ...activeBoard, tasks: sortedTasks };
  }, [activeBoard, searchQuery, sortMode]);

  // CREATE BOARD
  const createBoard = ({ name, icon }) => {
    const newBoard = {
      id: crypto.randomUUID(),
      name,
      icon,
      tasks: []
    };

    setBoards((prev) => [...prev, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  // CREATE TASK
  const createTask = (boardId, status, task) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: crypto.randomUUID(),
                  title: task.title,
                  tags: task.tags || [],
                  priority: task.priority || "normal",
                  status,
                  comments: task.comments || [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }
              ]
            }
          : board
      )
    );
  };

  // UPDATE TASK (used by modal)
  const updateTask = (boardId, updatedTask) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((t) =>
                t.id === updatedTask.id
                  ? {
                      ...t,
                      ...updatedTask,
                      updatedAt: new Date().toISOString()
                    }
                  : t
              )
            }
          : board
      )
    );
  };

  // MOVE TASK BETWEEN COLUMNS (DnD inside same board)
  const moveTask = (fromBoardId, taskId, newStatus) => {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === fromBoardId
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

  // MOVE TASK BETWEEN BOARDS (DnD cross-board)
  const moveTaskToBoard = (fromBoardId, toBoardId, taskId, newStatus) => {
    setBoards((prev) => {
      let movedTask = null;

      // 1) Remove from origin board
      const boardsWithoutTask = prev.map((board) => {
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

      if (!movedTask) return prev;

      // 2) Add to destination board
      const updatedBoards = boardsWithoutTask.map((board) =>
        board.id === toBoardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  ...movedTask,
                  status: newStatus || movedTask.status,
                  updatedAt: new Date().toISOString()
                }
              ]
            }
          : board
      );

      return updatedBoards;
    });

    setActiveBoardId(toBoardId);
  };

  // 🔥 SOFT DELETE TASK
  const softDeleteTask = (fromBoardId, taskId, originalStatus) => {
  setBoards((prevBoards) => {
    let deletedTask = null;
    let originalBoardName = null;

    const updatedBoards = prevBoards.map((board) => {
      if (board.id !== fromBoardId) return board;

      originalBoardName = board.name;

      const remaining = board.tasks.filter((t) => {
        if (t.id === taskId) {
          deletedTask = t;
          return false;
        }
        return true;
      });

      return { ...board, tasks: remaining };
    });

    if (deletedTask) {
      setTrash((prevTrash) => {
        // 🚫 Evitar duplicados en trash
        if (prevTrash.some((t) => t.id === deletedTask.id)) {
          return prevTrash;
        }

        return [
          ...prevTrash,
          {
            ...deletedTask,
            originalBoardId: fromBoardId,
            originalBoardName,      // 👈 guardamos el nombre del board
            originalStatus
          }
        ];
      });
    }

    return updatedBoards;
  });
};

  // 🔥 RESTORE TASK
  const restoreTask = (taskId) => {
    setTrash((prevTrash) => {
      const task = prevTrash.find((t) => t.id === taskId);
      if (!task) return prevTrash;

      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === task.originalBoardId
            ? {
                ...board,
                tasks: [
                  ...board.tasks,
                  {
                    ...task,
                    status: task.originalStatus,
                    updatedAt: new Date().toISOString()
                  }
                ]
              }
            : board
        )
      );

      return prevTrash.filter((t) => t.id !== taskId);
    });
  };

  return {
    boards,
    trash,                 // 👈 NUEVO
    activeBoardId,
    filteredBoard,
    sortMode,
    searchQuery,

    setSortMode,
    setSearchQuery,
    selectBoard,

    createBoard,
    createTask,
    updateTask,
    moveTask,
    moveTaskToBoard,

    softDeleteTask,        // 👈 NUEVO
    restoreTask            // 👈 NUEVO
  };
}