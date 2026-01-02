import { Box, Typography, List, ListItemButton } from "@mui/material";
import SidebarBoardItem from "./SideBoardItem";

export default function SidebarBoards({
    boards,
    activeBoardId,
    onSelectBoard,
    onOpenNewBoard
}) {
    return (
        <Box
        sx={(theme) => ({
            width: 260,
            backgroundColor: theme.palette.background.default,
            borderRight: `1px solid ${theme.palette.divider}`,
            p: 2,
            display: "flex",
            flexDirection: "column"
        })}
        >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Boards
        </Typography>

        <List sx={{ flexGrow: 1 }}>
            {boards.map((board) => (
            <SidebarBoardItem
                key={board.id}
                board={board}
                activeBoardId={activeBoardId}
                onSelectBoard={onSelectBoard}
            />
            ))}
        </List>

        {/* ADD NEW BOARD BUTTON */}
        <ListItemButton
            onClick={onOpenNewBoard}
            sx={(theme) => ({
            borderRadius: 1,
            mt: 2,
            backgroundColor:
                theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            "&:hover": {
                backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[700]
            }
            })}
        >
            + Add new board
        </ListItemButton>
        </Box>
    );
}