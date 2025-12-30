import { Box, Typography, Button, Stack } from "@mui/material";
import TaskCard from "./TaskCard";

export default function BoardColumn({ title, tasks, status, sortMode, onOpenTask }) {
    // --- Sorting logic ---
    const sortTasks = (tasks, mode) => {
        if (mode === "priority") {
        const priorityOrder = {
            critical: 1,
            high: 2,
            normal: 3,
            low: 4
        };

        return [...tasks].sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        }

        if (mode === "tag") {
        return [...tasks].sort((a, b) => {
            const tagA = a.tags[0] || "";
            const tagB = b.tags[0] || "";
            return tagA.localeCompare(tagB);
        });
        }

        if (mode === "title") {
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        }

        return tasks;
    };

    const sortedTasks = sortTasks(tasks, sortMode);

    return (
        <Box
        sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            p: 2,
            minHeight: "70vh",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column"
        }}
        >
        {/* Header */}
        <Typography
            variant="h6"
            sx={{
            fontWeight: 700,
            mb: 2,
            display: "flex",
            justifyContent: "space-between"
            }}
        >
            {title}
            <Typography component="span" sx={{ opacity: 0.6, fontSize: "0.9rem" }}>
            {sortedTasks.length}
            </Typography>
        </Typography>

        {/* Task list */}
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {sortedTasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onClick={() => onOpenTask(task)}
            />
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