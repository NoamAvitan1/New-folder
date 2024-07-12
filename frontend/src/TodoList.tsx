import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import styles from "./TodoList.module.css";

interface ITodo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [id, setId] = useState<number>(-1);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.description !== "" && formData.title !== "" && id === -1) {
      setTodos([
        ...todos,
        { ...formData, id: todos.length, isCompleted: false },
      ]);
    }
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...formData, id: id, isCompleted: false } : todo
      )
    );
    setFormData({ title: "", description: "" });
  };

  const editTodo = (id: number) => {
    const [todo] = todos.filter((todo) => todo.id === id);
    if (todo) {
      const { title, description } = todo;
      setFormData({ title, description });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        height: "800px",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          height: "400px",
          gap: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <span>title</span>
          <input
            style={{
              outline: "none",
              border: "2px solid black",
              borderRadius: "4px",
              padding: "7px",
            }}
            placeholder="football"
            type="text"
            id="title"
            name="title"
            value={formData?.title}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <span>description</span>
          <input
            style={{
              outline: "none",
              border: "2px solid black",
              borderRadius: "4px",
              padding: "7px",
            }}
            placeholder="football is..."
            type="text"
            id="description"
            name="description"
            value={formData?.description}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          style={{
            padding: "10px",
            backgroundColor: "skyblue",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            width: "20%",
          }}
        >
          save
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "40%",
        }}
      >
        {todos.map((todo, i) => (
          <div style={{ border: "2px solid black", padding: "2px" }} key={i}>
            <p>title:{todo.title}</p>
            <p>description:{todo.description}</p>
            <button
              onClick={() => {
                editTodo(todo.id), setId(todo.id);
              }}
              className={styles.modal}
            >
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
