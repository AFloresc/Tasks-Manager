import { Typography, ListItemButton } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

export default function SidebarBoardItem({ board, activeBoardId, onSelectBoard }) {
    const { setNodeRef } = useDroppable({
        id: "board-" + board.id
    });

    return (
        <ListItemButton
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
}