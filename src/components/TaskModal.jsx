import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Chip,
  Stack,
  Typography
} from "@mui/material";

const STATUS_OPTIONS = [
  { value: "backlog", label: "Backlog" },
  { value: "inProgress", label: "In Progress" },
  { value: "inReview", label: "In Review" },
  { value: "completed", label: "Completed" }
];

const PRIORITY_OPTIONS = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" }
];

const TAG_OPTIONS = ["Technical", "Front-end", "Design", "Concept"];

export default function TaskModal({ open, task, onClose, onSave }) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("backlog");
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("normal");

  // Load task data OR reset for new task
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setTags(task.tags);
      setPriority(task.priority || "normal");
    } else {
      // NEW TASK DEFAULTS
      setTitle("");
      setStatus("backlog");
      setTags([]);
      setPriority("normal");
    }
  }, [task, open]);

  const handleToggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    const result = {
      ...(task || {}), // keep id if editing
      title,
      status,
      tags,
      priority
    };

    onSave(result);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditing ? "Edit Task" : "Create Task"}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Task name */}
        <TextField
          label="Task name"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Status */}
        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Priority */}
        <TextField
          select
          label="Priority"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Tags */}
        <div>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Tags
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {TAG_OPTIONS.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                onClick={() => handleToggleTag(tag)}
                color={tags.includes(tag) ? "primary" : "default"}
                variant={tags.includes(tag) ? "filled" : "outlined"}
              />
            ))}
          </Stack>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {isEditing ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}