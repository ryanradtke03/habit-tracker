import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div
      style={{
        backgroundColor: "#1C1C1E", // darker header for theme
        padding: "1rem",
        color: "white",
      }}
    >
      <div className="container">
        <h1>Habit Tracker</h1>
        <nav>
          <Link to="/">Dashboard</Link> <Link to="/about">About</Link>
        </nav>
      </div>
    </div>
  );
}
