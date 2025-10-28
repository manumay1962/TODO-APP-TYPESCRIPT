import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState(false);
  const [textVal, setTextVal] = useState(todo.title);

  const saveEdit = () => {
    if (textVal.trim() === "") return; // avoid empty rename
    editHandler(todo.id, textVal.trim());
    setEditActive(false);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        px: 2,
        py: 1,
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": { backgroundColor: "#f8f8f8" },
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        {editActive ? (
          <TextField
            autoFocus
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            sx={{ flex: 1 }}
            size="small"
          />
        ) : (
          <Typography
            sx={{
              flex: 1,
              textDecoration: todo.isCompleted ? "line-through" : "none",
              opacity: todo.isCompleted ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            {todo.title}
          </Typography>
        )}

        {/* Complete Toggle */}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />

        {/* Delete */}
        <Button
          onClick={() => deleteHandler(todo.id)}
          sx={{ opacity: 0.7, color: "black" }}
        >
          <DeleteIcon />
        </Button>

        {/* Edit / Save Toggle */}
        <Button
          variant="outlined"
          sx={{ fontWeight: 600 }}
          onClick={() =>
            editActive ? saveEdit() : setEditActive(true)
          }
        >
          {editActive ? "Save" : "Edit"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
