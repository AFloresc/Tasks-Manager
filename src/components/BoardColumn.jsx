import { Box, Typography, Stack } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function BoardColumn({
    title,
    status,
    tasks = [],
    boardId,
    onOpenTask
}) {
    const { setNodeRef } = useDroppable({ 
        id: `${boardId}-${status}`,
        data: {
            type: "column",
            boardId
        }
    });

    return (
        <Box
        ref={setNodeRef}
        sx={(theme) => ({
            width: "100%",
            minWidth: 0,               // 👈 evita overflow del grid
            maxWidth: "100%",
            boxSizing: "border-box",
            overflow: "hidden",        // 👈 evita que las cards sobresalgan
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            gap: 2
        })}
        >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
        </Typography>

        <Stack spacing={2} sx={{ flexGrow: 1, minWidth: 0 }}>
            {tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                boardId={boardId}
                onClick={() => onOpenTask(task, boardId)}
            />
            ))}
        </Stack>
        </Box>
    );
}