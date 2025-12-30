import { Box, Typography, Button, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

export default function BoardColumn({ title, tasks, status, onOpenTask }) {
    return (
        <Box
        sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            p: 2,
            minHeight: "70vh",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
        }}
        >
        {/* Header */}
        <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, display: "flex", justifyContent: "space-between" }}
        >
            {title}
            <Typography component="span" sx={{ opacity: 0.6, fontSize: "0.9rem" }}>
            {tasks.length}
            </Typography>
        </Typography>

        {/* Task list */}
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onOpenTask(task)} />
            ))}
        </Stack>

        {/* Add new task */}
        <Button
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => console.log("TODO: open new task modal")}
        >
            Add new task
        </Button>
        </Box>
    );
}