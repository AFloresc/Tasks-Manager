import { Box, Chip, Stack, Typography } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, onClick }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
        id: task.id
        });

    const style = {
        transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab"
    };

    // Color por prioridad
    const priorityColor = {
        critical: "error",
        high: "warning",
        normal: "info",
        low: "default"
    }[task.priority];

    return (
        <Box
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onClick}
        style={style}
        sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            transition: "0.15s ease",
            "&:hover": {
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
            }
        }}
        >
        {/* Título */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {task.title}
        </Typography>

        {/* Badges */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {/* Prioridad */}
            <Chip
            label={task.priority}
            size="small"
            color={priorityColor}
            sx={{ textTransform: "capitalize" }}
            />

            {/* Tags */}
            {task.tags.map((tag) => (
            <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
            />
            ))}
        </Stack>
        </Box>
    );
}