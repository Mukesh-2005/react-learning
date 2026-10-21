import { useState } from "react";
import "./App.css";

function Header({ tasks }) {
  const name = "Mukesh";

  return (
    <header className="header">
      <h1>My Task Manager</h1>
      <p>
        Completed: {tasks.filter(function (t) { return t.done; }).length} / {tasks.length}
      </p>
      <div className="profile">Admin: {name}</div>
    </header>
  );
}

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();               // no page reload
    const trimmed = text.trim();
    if (trimmed === "") return;           // ignore empty input
    onAdd(trimmed);                       // ask App to add it
    setText("");                          // clear the box
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={function (event) { setText(event.target.value); }}
        placeholder="What needs doing?"
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskCard({ id, text, done, onToggle, onDelete }) {
  return (
    <div className={done ? "task-card done" : "task-card"}>
      <h3>#{id} {text}</h3>
      <span className={done ? "badge completed" : "badge pending"}>
        {done ? "Completed" : "Pending"}
      </span>
      <div className="actions">
        <button onClick={function () { onToggle(id); }}>
          {done ? "Undo" : "Mark as Done"}
        </button>
        <button className="btn-delete" onClick={function () { onDelete(id); }}>
          Delete
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 My Task Manager</p>
    </footer>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    { id: 0, text: "Complete HTML assignment", done: false },
    { id: 1, text: "Learn JavaScript", done: true },
    { id: 2, text: "Build a responsive website", done: false }
  ]);
  const [nextId, setNextId] = useState(3);

  function addTask(text) {
    setTasks([...tasks, { id: nextId, text: text, done: false }]);
    setNextId(nextId + 1);
  }

  function toggleTask(id) {
    setTasks(tasks.map(function (t) {
      if (t.id === id) {
        return { ...t, done: !t.done };
      }
      return t;
    }));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(function (t) {
      return t.id !== id;
    }));
  }

  return (
    <div>
      <Header tasks={tasks} />
      <main className="main">
        <TaskForm onAdd={addTask} />

        {tasks.length === 0 && (
          <p className="empty">No tasks yet. Add one above.</p>
        )}

        {tasks.map(function (t) {
          return (
            <TaskCard
              key={t.id}
              id={t.id}
              text={t.text}
              done={t.done}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          );
        })}
      </main>
      <Footer />
    </div>
  );
}

export default App;