import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState("");

  const completeHandler = (id: string): void => {
    setTodos((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, isCompleted: !i.isCompleted } : i
      )
    );
  };

  const deleteHandler = (id: string): void => {
    setTodos((prev) => prev.filter((i) => i.id !== id));
  };

  const editHandler = (id: string, newTitle: string): void => {
    setTodos((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, title: newTitle } : i
      )
    );
  };

  const submitHandler = (): void => {
    if (!title.trim()) return;

    const newTodo: TodoItemType = {
      id: crypto.randomUUID(),
      title: title.trim(),
      isCompleted: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          height: "95vh",
          py: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(255,255,255,0.20)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderRadius: "16px",
          padding: "1rem",
          boxShadow: "0 10px 32px rgba(0,0,0,0.25)",
        }}
      >
        <AppBar
          position="sticky"
          elevation={4}
          sx={{
            background: "rgba(255,255,255,0.25)",
            color: "#111",
            borderRadius: "10px",
            mt: 1,
          }}
        >
          <Toolbar>
            <Typography variant="h5" fontWeight={700}>
              ✅ Todo App
            </Typography>
          </Toolbar>
        </AppBar>

        <Stack flex={1} spacing={2} overflow="auto" mt={2}>
          {todos.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                textAlign: "center",
                py: 4,
                background: "rgba(255,255,255,0.25)",
                borderRadius: 2,
                fontSize: "1.1rem",
                opacity: 0.8,
              }}
            >
              No tasks yet! Add something ✨
            </Paper>
          ) : (
            todos.map((i) => (
              <TodoItem
                key={i.id}
                todo={i}
                completeHandler={completeHandler}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            ))
          )}
        </Stack>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            fullWidth
            label="Add new task..."
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitHandler()}
            sx={{
              backgroundColor: "rgba(255,255,255,0.6)",
              borderRadius: 2,
            }}
          />
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: "#1e3a8a",
              "&:hover": { bgcolor: "#1e40af" },
            }}
            disabled={!title.trim()}
            onClick={submitHandler}
          >
            Add
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
