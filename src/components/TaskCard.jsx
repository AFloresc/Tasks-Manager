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
        cursor: "pointer"
      }}
      onClick={onClick}   // ← AHORA SÍ FUNCIONA
    >
      {/* DRAG HANDLE */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="small"
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()} // ← NO BLOQUEA EL CLICK DE LA TARJETA
        >
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        {task.title}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Chip label={task.priority} size="small" color={priorityColor} />
        {task.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}