import { Box, Typography, List, ListItemButton } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

export default function SidebarBoards({
    boards,
    activeBoardId,
    onSelectBoard,
    onOpenNewBoard
}) {
    return (
        <Box
        sx={{
            width: 260,
            backgroundColor: "grey.100",
            borderRight: "1px solid #ddd",
            p: 2,
            display: "flex",
            flexDirection: "column"
        }}
        >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Boards
        </Typography>

        <List sx={{ flexGrow: 1 }}>
            {boards.map((board) => {
            // Cada board es un droppable
            const { setNodeRef } = useDroppable({
                id: "board-" + board.id
            });

            return (
                <ListItemButton
                key={board.id}
                ref={setNodeRef}
                selected={board.id === activeBoardId}
                onClick={() => onSelectBoard(board.id)}
                sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "primary.dark"
                    }
                    }
                }}
                >
                <Typography sx={{ mr: 1 }}>{board.icon}</Typography>
                <Typography>{board.name}</Typography>
                </ListItemButton>
            );
            })}
        </List>

        <ListItemButton
            onClick={onOpenNewBoard}
            sx={{
            borderRadius: 1,
            mt: 2,
            backgroundColor: "grey.200",
            "&:hover": { backgroundColor: "grey.300" }
            }}
        >
            + Add new board
        </ListItemButton>
        </Box>
    );
}