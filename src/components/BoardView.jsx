import { Box, Typography, Grid } from "@mui/material";
import BoardColumn from "./BoardColumn";

export default function BoardView({ board, onOpenTask }) {
    if (!board) {
        return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h6">Select a board to start</Typography>
        </Box>
        );
    }

  // Filtrar tareas por estado
    const backlog = board.tasks.filter(t => t.status === "backlog");
    const inProgress = board.tasks.filter(t => t.status === "inProgress");
    const inReview = board.tasks.filter(t => t.status === "inReview");
    const completed = board.tasks.filter(t => t.status === "completed");

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            {board.icon} {board.name}
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
            <BoardColumn
                title="Backlog"
                tasks={backlog}
                status="backlog"
                onOpenTask={onOpenTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                title="In Progress"
                tasks={inProgress}
                status="inProgress"
                onOpenTask={onOpenTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                title="In Review"
                tasks={inReview}
                status="inReview"
                onOpenTask={onOpenTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                title="Completed"
                tasks={completed}
                status="completed"
                onOpenTask={onOpenTask}
            />
            </Grid>
        </Grid>
        </Box>
    );
}