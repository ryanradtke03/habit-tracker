import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Dashboard.css";

export default function Dashboard() {
  const [habits, setHabits] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("habits");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Drink Water", completed: false },
          { id: 2, name: "Meditate", completed: false },
          { id: 3, name: "Study", completed: false },
        ];
  });

  const [newHabit, setNewHabit] = useState("");

  const today = new Date().toLocaleDateString();

  // Save to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const nextId =
      habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1;
    setHabits([
      ...habits,
      { id: nextId, name: newHabit.trim(), completed: false },
    ]);
    setNewHabit("");
  };

  return (
    <>
      <Header />
      <main className="dashboard">
        <div className="container">
          <h2 className="title">Dashboard </h2>
          <h2>{today}</h2>

          <div className="add-habit">
            <input
              type="text"
              placeholder="New habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
            />
            <button onClick={addHabit}>Add Habit</button>
          </div>

          <ul className="habit-list">
            {habits.map((habit) => (
              <li key={habit.id} className="habit-card">
                <div className="habit-left">
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => {
                      const updated = habits.map((h) =>
                        h.id === habit.id
                          ? { ...h, completed: !h.completed }
                          : h
                      );
                      setHabits(updated);
                    }}
                  />
                  <Link
                    to={`/habit/${encodeURIComponent(
                      habit.name.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    className="habit-name"
                  >
                    {habit.name}
                  </Link>
                </div>
                <button
                  className="habit-delete"
                  onClick={() =>
                    setHabits(habits.filter((h) => h.id !== habit.id))
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <p className="progress-text">
            Progress: {habits.filter((h) => h.completed).length} /{" "}
            {habits.length} completed
          </p>
        </div>
      </main>
    </>
  );
}
