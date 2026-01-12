import { Box, Typography, Button, Chip } from "@mui/material";

export default function TrashView({ trash = [], onRestore }) {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Deleted Tasks
      </Typography>

      {trash.length === 0 && (
        <Typography>No deleted tasks.</Typography>
      )}

      {trash.map((task) => (
        <Box
          key={task.id}
          sx={{
            p: 2,
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            backgroundColor: "#f9f9f9"
          }}
        >
          {/* Título */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {task.title || "Untitled task"}
          </Typography>

          {/* Metadatos */}
          <Typography variant="caption" color="text.secondary">
            Priority: {task.priority} — Status: {task.originalStatus}
          </Typography>

          {/* Tags */}
          <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {task.tags?.map((tag, i) => (
              <Chip key={i} label={tag} size="small" variant="outlined" />
            ))}
          </Box>

          {/* Fechas */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Created: {new Date(task.createdAt).toLocaleDateString()} — Updated:{" "}
            {new Date(task.updatedAt).toLocaleDateString()}
          </Typography>

          {/* Board original: nombre si existe, si no id */}
          <Typography variant="caption" sx={{ mt: 1 }}>
            From board: {task.originalBoardName || task.originalBoardId}
          </Typography>

          {/* Botón restaurar */}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => onRestore(task.id)}
          >
            Restore
          </Button>
        </Box>
      ))}
    </Box>
  );
}