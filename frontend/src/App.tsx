import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NPCs from "./pages/NPCs";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sessions" element={<NPCs />} />
        <Route path="/pcs" element={<NPCs />} />
        <Route path="/history" element={<NPCs />} />
        <Route path="/locations" element={<NPCs />} />
        <Route path="/npcs" element={<NPCs />} />
        <Route path="/items" element={<NPCs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
