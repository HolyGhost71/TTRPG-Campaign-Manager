import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";
import "./Layout.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
