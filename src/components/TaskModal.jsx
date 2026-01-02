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
  Typography,
  Box,
  Divider,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
  const isEditing = Boolean(task?.id);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("backlog");
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("normal");

  // COMMENTS
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // EDIT COMMENT MODE
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setTags(task.tags);
      setPriority(task.priority || "normal");
      setComments(task.comments || []);
    } else {
      setTitle("");
      setStatus("backlog");
      setTags([]);
      setPriority("normal");
      setComments([]);
    }

    setEditingCommentId(null);
    setEditingText("");
  }, [task, open]);

  const handleToggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: crypto.randomUUID(),
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: null
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleSaveEditedComment = () => {
    setComments(
      comments.map((c) =>
        c.id === editingCommentId
          ? { ...c, text: editingText, updatedAt: new Date().toISOString() }
          : c
      )
    );

    setEditingCommentId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  // El modal devuelve SOLO lo que el usuario puede editar;
  // TaskModalController se encarga de mezclarlo con la tarea original.
  const handleSave = () => {
    const result = {
      title,
      status,
      tags,
      priority,
      comments
    };

    onSave(result);
    onClose();
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Edit Task" : "Create Task"}</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          overflowY: "auto",
          pt: 2
        }}
      >
        {/* Task name */}
        <TextField
          label="Task name"
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
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

        <Divider />

        {/* COMMENTS */}
        <Typography variant="h6">Comments</Typography>

        <Stack spacing={2}>
          {comments.map((c) => (
            <Box
              key={c.id}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "grey.100",
                position: "relative"
              }}
            >
              {editingCommentId === c.id ? (
                <>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSaveEditedComment}
                      startIcon={<CheckIcon />}
                    >
                      Save
                    </Button>
                    <Button
                      size="small"
                      onClick={handleCancelEdit}
                      startIcon={<CloseIcon />}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography>{c.text}</Typography>

                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Created: {formatDate(c.createdAt)}
                    {c.updatedAt && <> — Edited: {formatDate(c.updatedAt)}</>}
                  </Typography>

                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleStartEditComment(c)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => handleDeleteComment(c.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Stack>

        {/* Add new comment */}
        <TextField
          label="Add a comment"
          fullWidth
          multiline
          minRows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <Button variant="outlined" onClick={handleAddComment}>
          Add comment
        </Button>
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