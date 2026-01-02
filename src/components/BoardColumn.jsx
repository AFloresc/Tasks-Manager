import { Box, Typography, Button, Stack } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function BoardColumn({
    boardId,
    title,
    tasks,
    status,
    sortMode,
    onOpenTask,
    onAddTask
}) {
    const { setNodeRef } = useDroppable({ id: status });

    const sortTasks = (tasks, mode) => {
        if (mode === "priority") {
        const order = { critical: 1, high: 2, normal: 3, low: 4 };
        return [...tasks].sort((a, b) => order[a.priority] - order[b.priority]);
        }
        if (mode === "tag") {
        return [...tasks].sort((a, b) => (a.tags[0] || "").localeCompare(b.tags[0] || ""));
        }
        if (mode === "title") {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        }
        return tasks;
    };

    const sortedTasks = sortTasks(tasks, sortMode);

    return (
        <Box
        ref={setNodeRef}
        sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            p: 2,
            minHeight: "70vh",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}
        >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {title} ({sortedTasks.length})
        </Typography>

        <Stack spacing={2}>
            {sortedTasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                boardId={boardId}
                onClick={() => onOpenTask(task)}
            />
            ))}
        </Stack>

        <Button
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
            onClick={() => onAddTask(status)}
        >
            Add new task
        </Button>
        </Box>
    );
}