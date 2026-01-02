import { Box, Chip, Stack, Typography, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, boardId, onClick }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
        id: task.id,
        data: {
            boardId,
            status: task.status
        }
        });

    const style = {
        transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : undefined,
        opacity: isDragging ? 0.5 : 1
    };

    const priorityColor = {
        critical: "error",
        high: "warning",
        normal: "info",
        low: "default"
    }[task.priority];

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleDateString("es-ES") : "—";

    return (
        <Box
        ref={setNodeRef}
        style={style}
        sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
            "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.25)" },
            cursor: "pointer",
            position: "relative"
        }}
        onClick={onClick}
        >
        {/* DRAG HANDLE */}
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
            <IconButton
            size="small"
            {...listeners}
            {...attributes}
            onClick={(e) => e.stopPropagation()}
            >
            <DragIndicatorIcon fontSize="small" />
            </IconButton>
        </Box>

        {/* TITLE */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {task.title}
        </Typography>

        {/* CREATED / UPDATED */}
        {(task.createdAt || task.updatedAt) && (
            <Typography
            variant="caption"
            sx={{ opacity: 0.6, display: "block", mb: 1 }}
            >
            🕒 {formatDate(task.createdAt)} — ✏️ {formatDate(task.updatedAt)}
            </Typography>
        )}

        {/* TAGS + PRIORITY */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={task.priority} size="small" color={priorityColor} />
            {task.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
        </Stack>
        </Box>
    );
}