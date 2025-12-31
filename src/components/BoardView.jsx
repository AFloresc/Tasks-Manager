import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";

import { DndContext } from "@dnd-kit/core";
import BoardColumn from "./BoardColumn";

export default function BoardView({
    board,
    sortMode,
    onChangeSortMode,
    searchQuery,
    onChangeSearch,
    onMoveTask,
    onOpenTask
}) {
    if (!board) {
        return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h6">Select a board to start</Typography>
        </Box>
        );
    }

    // Filtrar tareas por estado
    const backlog = board.tasks.filter((t) => t.status === "backlog");
    const inProgress = board.tasks.filter((t) => t.status === "inProgress");
    const inReview = board.tasks.filter((t) => t.status === "inReview");
    const completed = board.tasks.filter((t) => t.status === "completed");

    // Drag & Drop handler
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id; // id de la columna

        onMoveTask(taskId, newStatus);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Header con título + buscador + selector */}
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {board.icon} {board.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
            {/* Buscador */}
            <TextField
                label="Search"
                size="small"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                sx={{ width: 200 }}
            />

            {/* Selector de ordenación */}
            <TextField
                select
                label="Sort by"
                size="small"
                value={sortMode}
                onChange={(e) => onChangeSortMode(e.target.value)}
                sx={{ width: 150 }}
            >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="tag">Tag</MenuItem>
                <MenuItem value="title">Title</MenuItem>
            </TextField>
            </Box>
        </Box>

        {/* Drag & Drop context */}
        <DndContext onDragEnd={handleDragEnd}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <BoardColumn
                title="Backlog"
                tasks={backlog}
                status="backlog"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <BoardColumn
                title="In Progress"
                tasks={inProgress}
                status="inProgress"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <BoardColumn
                title="In Review"
                tasks={inReview}
                status="inReview"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                />
            </Grid>

            <Grid item xs={12} md={3}>
                <BoardColumn
                title="Completed"
                tasks={completed}
                status="completed"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                />
            </Grid>
            </Grid>
        </DndContext>
        </Box>
    );
}