import { useState } from "react";
import "./App.css";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "done", label: "Completed" }
];

function Header() {
  return (
    <header className="header">
      <h1>My Task Manager</h1>
      <div className="profile">Admin</div>
    </header>
  );
}

function Stats({ tasks }) {
  const doneCount = tasks.filter(function (t) { return t.done; }).length;

  return (
    <div className="stats">
      <div className="stat"><span>{tasks.length}</span> Total</div>
      <div className="stat"><span>{tasks.length - doneCount}</span> Pending</div>
      <div className="stat"><span>{doneCount}</span> Completed</div>
    </div>
  );
}

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") return;
    onAdd(trimmed);
    setText("");
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

function Toolbar({ search, onSearch, filter, onFilter }) {
  return (
    <div className="toolbar">
      <input
        type="text"
        value={search}
        onChange={function (event) { onSearch(event.target.value); }}
        placeholder="Search tasks..."
      />
      <div className="filters">
        {FILTERS.map(function (f) {
          return (
            <button
              key={f.value}
              className={filter === f.value ? "filter-btn active" : "filter-btn"}
              onClick={function () { onFilter(f.value); }}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TaskCard({ id, text, done, onToggle, onDelete }) {
  return (
    <div className={done ? "task-card done" : "task-card"}>
      <h3>{text}</h3>
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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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

  // derived data: calculated on every render, NOT stored in state
  const visibleTasks = tasks
    .filter(function (t) {
      if (filter === "pending") return !t.done;
      if (filter === "done") return t.done;
      return true;
    })
    .filter(function (t) {
      return t.text.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div>
      <Header />
      <main className="main">
        <Stats tasks={tasks} />
        <TaskForm onAdd={addTask} />
        <Toolbar
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
        />

        {tasks.length === 0 && (
          <p className="empty">No tasks yet. Add one above.</p>
        )}
        {tasks.length > 0 && visibleTasks.length === 0 && (
          <p className="empty">No tasks match your search or filter.</p>
        )}

        {visibleTasks.map(function (t) {
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