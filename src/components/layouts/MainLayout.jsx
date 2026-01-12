import { Box } from "@mui/material";
import SidebarBoards from "../SideBarBoards";
import BoardView from "../BoardView";
import TrashView from "../TrashView";

export default function MainLayout({
    boards,
    activeBoardId,
    onSelectBoard,

    board, // board filtrado + ordenado
    sortMode,
    onChangeSortMode,
    searchQuery,
    onChangeSearch,

    mode,
    onToggleDarkMode,

    onOpenTask,
    onAddTask,

    trash,            // 👈 AÑADIR
    onRestoreTask     // 👈 AÑADIR
    }) {
    // 👉 1) Si estamos en la papelera, mostrar TrashView
    if (activeBoardId === "trash") {
        return (
        <Box
            sx={(theme) => ({
            display: "flex",
            height: "100vh",
            width: "100%",
            backgroundColor: theme.palette.background.default
            })}
        >
            <SidebarBoards
            boards={boards}
            activeBoardId={activeBoardId}
            onSelectBoard={onSelectBoard}
            />

            <TrashView
                trash={trash}
                onRestore={onRestoreTask}
            />
        </Box>
        );
    }

    // 👉 2) Vista normal de boards
    return (
        <Box
        sx={(theme) => ({
            display: "flex",
            height: "100vh",
            width: "100%",
            backgroundColor: theme.palette.background.default,
            overflowX: "hidden"
        })}
        >
        <SidebarBoards
            boards={boards}
            activeBoardId={activeBoardId}
            onSelectBoard={onSelectBoard}
        />

        {board && (
            <BoardView
            board={board}
            sortMode={sortMode}
            onChangeSortMode={onChangeSortMode}
            searchQuery={searchQuery}
            onChangeSearch={onChangeSearch}
            onOpenTask={onOpenTask}
            onAddTask={onAddTask}
            mode={mode}
            onToggleDarkMode={onToggleDarkMode}
            />
        )}
        </Box>
    );
}