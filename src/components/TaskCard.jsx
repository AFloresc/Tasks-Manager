import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

export default function TaskCard({ task, onClick }) {
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