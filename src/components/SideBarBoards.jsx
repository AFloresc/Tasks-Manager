import { Box, Typography, List, ListItemButton } from "@mui/material";
import SidebarBoardItem from "./SideBoardItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function SidebarBoards({
  boards,
  activeBoardId,
  onSelectBoard,
  onOpenNewBoard
}) {
  return (
    <Box
      sx={(theme) => ({
        width: { xs: 0, sm: 260 },
        display: { xs: "none", sm: "flex" },
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
        p: 2,
        flexDirection: "column",
        flexShrink: 0
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

      <SidebarBoardItem
        key="trash"
        board={{
          id: "trash",
          name: "Trash",
          icon: <DeleteOutlineIcon />,   // 👈 ICONO MUI
          tasks: []
        }}
        activeBoardId={activeBoardId}
        onSelectBoard={onSelectBoard}
      />

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