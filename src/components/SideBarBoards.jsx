import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Button } from "@mui/material";

export default function SidebarBoards({ boards, activeBoardId, onSelectBoard, onOpenNewBoard }) {
    return (
        <Box
        sx={{
            width: 260,
            height: "100vh",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}
        >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Boards
        </Typography>

        <List sx={{ flexGrow: 1 }}>
            {boards.map(board => (
            <ListItemButton
                key={board.id}
                selected={board.id === activeBoardId}
                onClick={() => onSelectBoard(board.id)}
                sx={{
                borderRadius: 1,
                mb: 1,
                "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": { backgroundColor: "primary.dark" }
                }
                }}
            >
                <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography>{board.icon}</Typography>
                </ListItemIcon>
                <ListItemText primary={board.name} />
            </ListItemButton>
            ))}
        </List>

        <Divider />

        <Button
            variant="outlined"
            fullWidth
            onClick={onOpenNewBoard}
            sx={{ mt: 2 }}
        >
            Add new board
        </Button>
        </Box>
    );
}