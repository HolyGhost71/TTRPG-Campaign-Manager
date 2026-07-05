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
import SoloEntity from "./pages/SoloEntity";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/campaigns/:campaignId/" element={<Dashboard />} />
        <Route path="/campaigns/:campaignId/sessions" element={<Sessions />} />
        <Route path="/campaigns/:campaignId/pcs" element={<PCs />} />
        <Route path="/campaigns/:campaignId/history" element={<History />} />
        <Route
          path="/campaigns/:campaignId/locations"
          element={<Locations />}
        />
        <Route path="/campaigns/:campaignId/npcs" element={<NPCs />} />
        <Route path="/campaigns/:campaignId/items" element={<Items />} />
        <Route path="/campaigns/:campaignId/factions" element={<Factions />} />
        <Route path="/campaigns/:campaignId/quests" element={<Quests />} />
        <Route
          path="/campaigns/:campaignId/entities/:entityId"
          element={<SoloEntity />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
