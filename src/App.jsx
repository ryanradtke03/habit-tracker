import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import HabitDetail from "./pages/HabitDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/habit/:habitName" element={<HabitDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
