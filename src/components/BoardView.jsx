import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  IconButton
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import BoardColumn from "./BoardColumn";
import { useDroppable } from "@dnd-kit/core";

export default function BoardView({
  board,
  sortMode,
  onChangeSortMode,
  searchQuery,
  onChangeSearch,
  onOpenTask,
  onAddTask,
  mode,
  onToggleDarkMode
}) {
  // 🔥 DROPPABLE SOLO EN EL TOP BAR (para mover entre boards)
  const { setNodeRef } = useDroppable({
    id: "board-" + board.id,
    data: {
      type: "board",
      boardId: board.id
    }
  });

  const sortedTasks = [...board.tasks].sort((a, b) => {
    if (sortMode === "priority") {
      const order = { critical: 1, high: 2, normal: 3, low: 4 };
      return order[a.priority] - order[b.priority];
    }
    if (sortMode === "title") return a.title.localeCompare(b.title);
    if (sortMode === "createdAt")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortMode === "updatedAt")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    return 0;
  });

  const columns = {
    backlog: [],
    inProgress: [],
    inReview: [],
    completed: []
  };

  sortedTasks.forEach((task) => {
    const status = task.status;

    // Si el status no existe en columns, lo creamos dinámicamente
    if (!columns[status]) {
      columns[status] = [];
    }

    columns[status].push(task);
});

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3 },
        overflow: "visible",
        minWidth: 0,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* 🔥 TOP BAR — DROPPABLE DEL BOARD */}
      <Box
        ref={setNodeRef}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 3,
          gap: 2,
          minHeight: 60,              // 👈 IMPORTANTE para que el drop funcione
          backgroundColor: "transparent"
        }}
      >
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: 260 } }}
        />

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-end" }
          }}
        >
          <TextField
            select
            label="Sort by"
            value={sortMode}
            onChange={(e) => onChangeSortMode(e.target.value)}
            sx={{ width: { xs: "50%", sm: 160 } }}
          >
            <MenuItem value="priority">Priority</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="createdAt">Created</MenuItem>
            <MenuItem value="updatedAt">Updated</MenuItem>
          </TextField>

          <Button variant="contained" onClick={() => onAddTask("backlog")}>
            + Add Task
          </Button>

          <IconButton onClick={onToggleDarkMode}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>
      </Box>

      {/* COLUMNS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr"
          },
          columnGap: 3,
          rowGap: { xs: 3, sm: 3, md: 0 },
          boxSizing: "border-box",
          alignItems: "start"
        }}
      >
        <BoardColumn
          title="Backlog"
          status="backlog"
          tasks={columns.backlog}
          boardId={board.id}
          onOpenTask={onOpenTask}
        />
        <BoardColumn
          title="In Progress"
          status="inProgress"
          tasks={columns.inProgress}
          boardId={board.id}
          onOpenTask={onOpenTask}
        />
        <BoardColumn
          title="In Review"
          status="inReview"
          tasks={columns.inReview}
          boardId={board.id}
          onOpenTask={onOpenTask}
        />
        <BoardColumn
          title="Completed"
          status="completed"
          tasks={columns.completed}
          boardId={board.id}
          onOpenTask={onOpenTask}
        />
      </Box>
    </Box>
  );
}