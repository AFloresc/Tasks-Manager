import { Box, Typography, ListItemButton } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

export default function SidebarBoardItem({
  board,
  activeBoardId,
  onSelectBoard
}) {
  const isTrash = board.id === "trash";
  
  const { setNodeRef, isOver } = useDroppable({
    id: isTrash ? "trash" : "sidebar-board-" + board.id,
    data: {
      type: isTrash ? "trash" : "board",
      boardId: board.id
    }
  });


  return (
    <ListItemButton
      ref={setNodeRef}
      selected={board.id === activeBoardId}
      onClick={() => onSelectBoard(board.id)}
      sx={(theme) => ({
        borderRadius: 1,
        mb: 1,
        width: "100%",
        transition: "background-color 0.15s ease",

        backgroundColor: isOver
          ? theme.palette.primary.light
          : board.id === activeBoardId
          ? theme.palette.action.selected
          : "transparent",

        "&:hover": {
          backgroundColor: isOver
            ? theme.palette.primary.main
            : theme.palette.action.hover
        },

        "&.Mui-selected": {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark
          }
        }
      })}
    >
      <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
        {board.icon}
      </Box>

      <Typography>{board.name}</Typography>
    </ListItemButton>
  );
}