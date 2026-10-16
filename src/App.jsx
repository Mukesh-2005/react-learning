import "./App.css";

function Header() {
  const name = "Mukesh";

  return (
    <header className="header">
      <h1>My Task Manager</h1>
      <div className="profile">Admin: {name}</div>
    </header>
  );
}

function TaskCard({ text, done }) {
  return (
    <div className={done ? "task-card done" : "task-card"}>
      <h3>{text}</h3>
      <span className={done ? "badge completed" : "badge pending"}>
        {done ? "Completed" : "Pending"}
      </span>
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
  const tasks = [
    { id: 0, text: "Complete HTML assignment", done: false },
    { id: 1, text: "Learn JavaScript", done: true },
    { id: 2, text: "Build a responsive website", done: false },
    { id: 3, text: "I know it works", done: true}
  ];

  return (
    <div>
      <Header />
      <main className="main">
        {tasks.map(function (t) {
          return <TaskCard key={t.id} text={t.text} done={t.done} />;
        })}
      </main>
      <Footer />
    </div>
  );
}

export default App;