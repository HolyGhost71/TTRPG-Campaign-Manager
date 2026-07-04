import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NPCs from "./pages/NPCs";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Factions from "./pages/Factions";
import Sessions from "./pages/Sessions";
import Items from "./pages/Items";
import Locations from "./pages/Locations";
import PCs from "./pages/PCs";
import History from "./pages/History";
import Quests from "./pages/Quests";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/pcs" element={<PCs />} />
        <Route path="/history" element={<History />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/npcs" element={<NPCs />} />
        <Route path="/items" element={<Items />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/quests" element={<Quests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
