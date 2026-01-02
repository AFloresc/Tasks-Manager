import {
    Box,
    Typography,
    Grid,
    TextField,
    MenuItem
} from "@mui/material";
import BoardColumn from "./BoardColumn";

export default function BoardView({
    board,
    sortMode,
    onChangeSortMode,
    searchQuery,
    onChangeSearch,
    onOpenTask,
    onAddTask
}) {
    if (!board) return null;

    const backlog = board.tasks.filter((t) => t.status === "backlog");
    const inProgress = board.tasks.filter((t) => t.status === "inProgress");
    const inReview = board.tasks.filter((t) => t.status === "inReview");
    const completed = board.tasks.filter((t) => t.status === "completed");

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {board.icon} {board.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
                label="Search"
                size="small"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
            />

            <TextField
                select
                label="Sort by"
                size="small"
                value={sortMode}
                onChange={(e) => onChangeSortMode(e.target.value)}
            >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="tag">Tag</MenuItem>
                <MenuItem value="title">Title</MenuItem>
            </TextField>
            </Box>
        </Box>

        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
            <BoardColumn
                boardId={board.id}
                title="Backlog"
                tasks={backlog}
                status="backlog"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                onAddTask={onAddTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                boardId={board.id}
                title="In Progress"
                tasks={inProgress}
                status="inProgress"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                onAddTask={onAddTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                boardId={board.id}
                title="In Review"
                tasks={inReview}
                status="inReview"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                onAddTask={onAddTask}
            />
            </Grid>

            <Grid item xs={12} md={3}>
            <BoardColumn
                boardId={board.id}
                title="Completed"
                tasks={completed}
                status="completed"
                sortMode={sortMode}
                onOpenTask={onOpenTask}
                onAddTask={onAddTask}
            />
            </Grid>
        </Grid>
        </Box>
    );
}