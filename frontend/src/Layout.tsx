import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { useRef, useState } from "react";
import "./Layout.css";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = e.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    // Reset
    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore mostly vertical swipes
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    // Minimum swipe distance
    const swipeDistance = 75;

    if (Math.abs(deltaX) < swipeDistance) {
      return;
    }

    // Swipe right → open sidebar
    if (deltaX > 0 && collapsed) {
      setCollapsed(false);
    }

    // Swipe left → close sidebar
    if (deltaX < 0 && !collapsed) {
      setCollapsed(true);
    }
  };

  return (
    <div
      className={`layout ${collapsed ? "sidebar-collapsed" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
