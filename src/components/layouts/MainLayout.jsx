import { Box } from "@mui/material";
import SidebarBoards from "../SideBarBoards";
import BoardView from "../BoardView";

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
    onAddTask
    }) {
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
        {/* SIDEBAR */}
        <SidebarBoards
            boards={boards}
            activeBoardId={activeBoardId}
            onSelectBoard={onSelectBoard}
        />

        {/* BOARD VIEW */}
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