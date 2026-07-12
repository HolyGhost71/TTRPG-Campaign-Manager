import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import CreateEntity from "./pages/CreateEntity";
import EditEntity from "./pages/EditEntity";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/campaigns/:campaignId" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="npcs" element={<NPCs />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="pcs" element={<PCs />} />
          <Route path="history" element={<History />} />
          <Route path="quests" element={<Quests />} />
          <Route path="items" element={<Items />} />
          <Route path="locations" element={<Locations />} />
          <Route path="factions" element={<Factions />} />
          <Route path="entities/:entityId" element={<SoloEntity />} />
          <Route path="create-entity" element={<CreateEntity />} />
          <Route path="edit-entity/:entityId" element={<EditEntity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
