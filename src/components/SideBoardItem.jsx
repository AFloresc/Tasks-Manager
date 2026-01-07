import { Typography, ListItemButton } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

export default function SidebarBoardItem({
  board,
  activeBoardId,
  onSelectBoard
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "sidebar-board-" + board.id,
    data: {
      type: "board",
      boardId: board.id
    }
  });

  return (
    <ListItemButton
      ref={setNodeRef} // 👈 EL DROPPABLE DEBE ESTAR AQUÍ
      selected={board.id === activeBoardId}
      onClick={() => onSelectBoard(board.id)}
      sx={(theme) => ({
        borderRadius: 1,
        mb: 1,
        width: "100%",
        transition: "background-color 0.15s ease",

        // 👇 FEEDBACK CUANDO UNA TAREA ESTÁ ENCIMA
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
      <Typography sx={{ mr: 1 }}>{board.icon}</Typography>
      <Typography>{board.name}</Typography>
    </ListItemButton>
  );
}