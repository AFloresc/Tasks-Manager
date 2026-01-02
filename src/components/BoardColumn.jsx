import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function BoardColumn({ title, status, tasks, boardId, onOpenTask }) {
    const { setNodeRef } = useDroppable({
        id: status
    });

    return (
        <Box
        ref={setNodeRef}
        sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
            p: 2,
            minHeight: "80vh",
            border: (theme) => `1px solid ${theme.palette.divider}`
        }}
        >
        {/* COLUMN TITLE */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            {title}
        </Typography>

        {/* TASKS */}
        <Stack spacing={2}>
            {tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                boardId={boardId}
                onClick={() => onOpenTask(task)}
            />
            ))}
        </Stack>
        </Box>
    );
}