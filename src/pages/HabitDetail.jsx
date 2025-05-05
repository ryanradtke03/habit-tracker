import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import "./HabitDetail.css";

export default function HabitDetail() {
  const { habitName } = useParams();
  const decodedName = habitName.replace(/-/g, " ");

  const seed = [...decodedName].reduce((a, c) => a + c.charCodeAt(0), 0);
  const random = (min, max) => (seed % (max - min + 1)) + min;

  const createdDate = new Date(Date.now() - random(1, 30) * 86400000)
    .toISOString()
    .split("T")[0];
  const streak = random(1, 10);
  const completionRate = `${random(50, 100)}%`;

  return (
    <>
      <Header />
      <main className="habit-detail">
        <h2>Habit Detail</h2>
        <section>
          <h3>{decodedName.charAt(0).toUpperCase() + decodedName.slice(1)}</h3>
          <p>
            <strong>Created:</strong> {createdDate}
          </p>
          <p>
            <strong>Current Streak:</strong> {streak} days
          </p>
          <p>
            <strong>Completion Rate:</strong> {completionRate}
          </p>
        </section>

        <section>
          <h4>Notes</h4>
          <p>Keep it up! You're making great progress on {decodedName}!</p>
        </section>

        <Link to="/">← Back to Dashboard</Link>
      </main>
    </>
  );
}
