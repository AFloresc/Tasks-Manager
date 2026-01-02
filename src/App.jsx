import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useBoards } from "./components/hooks/useBoards";
import { getTheme } from "./theme";

import AppDndProvider from "./components/providers/AppDndProvider";
import MainLayout from "./components/layouts/MainLayout";

import TaskModalController from "./components/modals/TaskModalCOntroller";
import NewBoardModalController from "./components/modals/NewBoardModalController";

import { initialBoards } from "./data/initialBoards";

export default function App() {
  const {
    boards,
    activeBoardId,
    filteredBoard,
    selectBoard,

    sortMode,
    setSortMode,
    searchQuery,
    setSearchQuery,

    createBoard,
    createTask,
    updateTask,
    moveTask,
    moveTaskToBoard
  } = useBoards(initialBoards);

  const [mode, setMode] = useState("light");
  const toggleDarkMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />

      <AppDndProvider
        onMoveTask={moveTask}
        onMoveTaskToBoard={moveTaskToBoard}
      >
        <NewBoardModalController onCreate={createBoard}>
          {({ openNewBoard }) => (
            <TaskModalController
              onSave={updateTask}
              onCreate={(boardId, newTask) => {
                createTask(boardId, newTask.status, newTask);
              }}
            >
              {({ openTask }) => (
                <MainLayout
                  boards={boards}
                  activeBoardId={activeBoardId}
                  onSelectBoard={selectBoard}
                  board={filteredBoard}
                  sortMode={sortMode}
                  onChangeSortMode={setSortMode}
                  searchQuery={searchQuery}
                  onChangeSearch={setSearchQuery}
                  mode={mode}
                  onToggleDarkMode={toggleDarkMode}
                  onOpenTask={openTask}
                  onAddTask={(status) =>
                    openTask(
                      {
                        id: null,
                        title: "",
                        tags: [],
                        priority: "normal",
                        status,
                        comments: []
                      },
                      activeBoardId
                    )
                  }
                  onOpenNewBoard={openNewBoard}
                />
              )}
            </TaskModalController>
          )}
        </NewBoardModalController>
      </AppDndProvider>
    </ThemeProvider>
  );
}