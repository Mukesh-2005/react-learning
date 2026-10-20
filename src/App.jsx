import { useState } from "react";
import "./App.css";

function Header({ tasks }) {                    // receive it as a prop
  const name = "Mukesh";
  return (
    <header className="header">
      <h1>My Task Manager</h1>
      <p>Completed: {tasks.filter(function (t) { return t.done; }).length} / {tasks.length}</p>
      <div className="profile">Admin: {name}</div>
    </header>
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