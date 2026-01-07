import { Box, Typography, Chip } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, boardId, onClick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      type: "task",

      // 🔥 Getters dinámicos → siempre devuelven el valor actualizado
      get task() {
        return task;
      },
      get boardId() {
        return boardId;
      },
      get status() {
        return task.status;
      }
    }
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      sx={(theme) => ({
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: { xs: 1.2, sm: 2 },
        gap: { xs: 0.5, sm: 1 },
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 6px 16px rgba(0,0,0,0.12)"
              : "0 6px 16px rgba(0,0,0,0.5)",
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900]
        }
      })}
    >
      {/* DRAG HANDLE */}
      <Box
        {...listeners}
        {...attributes}
        sx={{
          cursor: "grab",
          display: "flex",
          justifyContent: "flex-end",
          mb: 1
        }}
      >
        <DragIndicatorIcon fontSize="small" />
      </Box>

      {/* TITLE */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          lineHeight: 1.25,
          wordBreak: "break-word",
          fontSize: { xs: "0.9rem", sm: "1rem" }
        }}
      >
        {task.title}
      </Typography>

      {/* DATES */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          wordBreak: "break-word",
          fontSize: { xs: "0.7rem", sm: "0.75rem" }
        }}
      >
        {new Date(task.createdAt).toLocaleDateString()} —{" "}
        {new Date(task.updatedAt).toLocaleDateString()}
      </Typography>

      {/* TAGS */}
      <Box
        sx={{
          mt: { xs: 0.5, sm: 1 },
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 0.5, sm: 1 },
          minWidth: 0
        }}
      >
        <Chip
          label={task.priority}
          size="small"
          sx={{
            height: { xs: 20, sm: 24 },
            fontSize: { xs: "0.65rem", sm: "0.75rem" }
          }}
          color={
            task.priority === "critical"
              ? "error"
              : task.priority === "high"
              ? "warning"
              : task.priority === "normal"
              ? "info"
              : "default"
          }
        />

        {task.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              height: { xs: 20, sm: 24 },
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              maxWidth: "100%",
              overflow: "hidden"
            }}
          />
        ))}
      </Box>
    </Box>
  );
}