import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Grid
} from "@mui/material";

const ICONS = ["🎨", "📚", "🧠", "📝", "💻", "📦", "🚀", "⚙️"];

export default function NewBoardModal({ open, onClose, onCreate }) {
    const [name, setName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

    const handleCreate = () => {
        if (!name.trim()) return;
        onCreate({ name, icon: selectedIcon });
        setName("");
        setSelectedIcon(ICONS[0]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>New board</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
            label="Board name"
            placeholder="e.g. Default Board"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Logo
            </Typography>

            <Grid container spacing={1}>
                {ICONS.map((icon) => (
                <Grid item key={icon}>
                    <IconButton
                    onClick={() => setSelectedIcon(icon)}
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        border:
                        selectedIcon === icon
                            ? "2px solid #1976d2"
                            : "2px solid transparent",
                        fontSize: "1.5rem"
                    }}
                    >
                    {icon}
                    </IconButton>
                </Grid>
                ))}
            </Grid>
            </Box>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleCreate}>
            Create board
            </Button>
        </DialogActions>
        </Dialog>
    );
}