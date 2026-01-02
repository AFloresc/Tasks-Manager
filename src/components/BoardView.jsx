import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Stack,
    IconButton
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import BoardColumn from "./BoardColumn";

export default function BoardView({
    board,
    sortMode,
    onChangeSortMode,
    searchQuery,
    onChangeSearch,
    onOpenTask,
    onAddTask,
    mode,
    onToggleDarkMode
}) {
    // Ordenar tareas según sortMode
    const sortedTasks = [...board.tasks].sort((a, b) => {
        if (sortMode === "priority") {
        const order = { critical: 1, high: 2, normal: 3, low: 4 };
        return order[a.priority] - order[b.priority];
        }
        if (sortMode === "title") {
        return a.title.localeCompare(b.title);
        }
        if (sortMode === "createdAt") {
        return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortMode === "updatedAt") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return 0;
    });

    // Agrupar tareas por columna
    const columns = {
        backlog: [],
        inProgress: [],
        inReview: [],
        completed: []
    };

    sortedTasks.forEach((task) => {
        columns[task.status].push(task);
    });

    return (
        <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        {/* TOP BAR: Search + Sort + Add Task + Dark Mode */}
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2
            }}
        >
            {/* LEFT: Search */}
            <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            sx={{ width: 260 }}
            />

            {/* RIGHT: Sort + Add Task + Dark Mode */}
            <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                select
                label="Sort by"
                value={sortMode}
                onChange={(e) => onChangeSortMode(e.target.value)}
                sx={{ width: 160 }}
            >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="createdAt">Created</MenuItem>
                <MenuItem value="updatedAt">Updated</MenuItem>
            </TextField>

            <Button
                variant="contained"
                onClick={() => onAddTask("backlog")}
            >
                + Add Task
            </Button>

            <IconButton onClick={onToggleDarkMode}>
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            </Stack>
        </Box>

        {/* COLUMNS */}
        <Box
            sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3
            }}
        >
            <BoardColumn
            title="Backlog"
            status="backlog"
            tasks={columns.backlog}
            boardId={board.id}
            onOpenTask={onOpenTask}
            />

            <BoardColumn
            title="In Progress"
            status="inProgress"
            tasks={columns.inProgress}
            boardId={board.id}
            onOpenTask={onOpenTask}
            />

            <BoardColumn
            title="In Review"
            status="inReview"
            tasks={columns.inReview}
            boardId={board.id}
            onOpenTask={onOpenTask}
            />

            <BoardColumn
            title="Completed"
            status="completed"
            tasks={columns.completed}
            boardId={board.id}
            onOpenTask={onOpenTask}
            />
        </Box>
        </Box>
    );
}