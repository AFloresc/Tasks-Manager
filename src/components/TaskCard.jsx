import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

export default function TaskCard({ task, onClick }) {
    const getPriorityColor = (priority) => {
        switch (priority) {
        case "critical":
            return "#d32f2f"; // rojo fuerte
        case "high":
            return "#f57c00"; // naranja
        case "normal":
            return "#0288d1"; // azul
        case "low":
            return "#757575"; // gris
        default:
            return "#9e9e9e";
        }
    };

    return (
        <Card
        onClick={onClick}
        sx={{
            cursor: "pointer",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "0.2s",
            "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)"
            }
        }}
        >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Title */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {task.title}
            </Typography>

            {/* Priority */}
            <Chip
            label={task.priority}
            size="small"
            sx={{
                textTransform: "capitalize",
                backgroundColor: getPriorityColor(task.priority),
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
                alignSelf: "flex-start"
            }}
            />

            {/* Tags */}
            <Stack direction="row" spacing={1} flexWrap="wrap">
            {task.tags.map((tag) => (
                <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                    fontSize: "0.7rem",
                    backgroundColor: "rgba(0,0,0,0.05)",
                    fontWeight: 500
                }}
                />
            ))}
            </Stack>
        </CardContent>
        </Card>
    );
}