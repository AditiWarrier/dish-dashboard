import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import DishCard from "./DishCard";
import "./styles.css";

const BACKEND_URL = "http://localhost:4000";

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activity, setActivity] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);

  const triggeredRef = useRef(new Set());

  const addActivity = (msg) => {
    setActivity((prev) => {
      const updated = [msg, ...prev];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/dishes`)
      .then((res) => res.json())
      .then((data) => setDishes(data));
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      setIsConnected(true);
      addActivity("Reconnected — syncing data...");

      fetch(`${BACKEND_URL}/api/dishes`)
        .then((res) => res.json())
        .then((data) => setDishes(data));
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      addActivity("Lost connection to server");
    });

    socket.on("dishUpdated", (updatedDish) => {
      const idStr = String(updatedDish.dishId);

      setDishes((prev) =>
        prev.map((d) =>
          d.dishId === updatedDish.dishId ? updatedDish : d
        )
      );

      if (triggeredRef.current.has(idStr)) {
        triggeredRef.current.delete(idStr);
        return;
      }

      const status = updatedDish.isPublished ? "published" : "unpublished";
      addActivity(`${updatedDish.dishName} ${status} (external)`);

      setLastUpdated(updatedDish.dishId);
      setTimeout(() => setLastUpdated(null), 8000);
    });

    return () => socket.disconnect();
  }, []);

  const toggleDish = async (id) => {
    const idStr = String(id);
    triggeredRef.current.add(idStr);

    const res = await fetch(`${BACKEND_URL}/api/dishes/${id}/toggle`, {
      method: "PATCH",
    });
    const updated = await res.json();

    setDishes((prev) =>
      prev.map((d) => (d.dishId === id ? updated : d))
    );

    const status = updated.isPublished ? "published" : "unpublished";
    addActivity(`${updated.dishName} ${status} (dashboard)`);
  };

  return (
    <div className="app-wrap">
      <div className="header">
        <h1>Dishes Dashboard</h1>

        <div className="controls">
          <div
            className="conn-badge"
            style={{
              background: isConnected ? "#d4edda" : "#f8d7da",
              color: isConnected ? "#155724" : "#721c24",
              borderColor: isConnected ? "#c3e6cb" : "#f5c6cb",
            }}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </div>

          <button className="activity-btn" onClick={() => setPanelOpen(true)}>
            Activity
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.dishId}
            dish={dish}
            onToggle={() => toggleDish(dish.dishId)}
            isExternal={lastUpdated === dish.dishId}
          />
        ))}
      </div>

      {panelOpen && (
        <div className="activity-panel">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3>Activity Feed</h3>
            <button
              onClick={() => setPanelOpen(false)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                background: "#f5f5f5",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>

          <div className="activity-list">
            {activity.length === 0 && <p style={{ opacity: 0.6 }}>No activity yet</p>}
            <ul>
              {activity.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
