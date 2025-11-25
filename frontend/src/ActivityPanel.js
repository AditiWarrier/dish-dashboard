import React from "react";

export default function ActivityPanel({ open, onClose, activity }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-350px",
        width: 320,
        height: "100vh",
        background: "white",
        borderLeft: "1px solid #ddd",
        boxShadow: "-2px 0 8px rgba(0,0,0,0.08)",
        padding: 20,
        transition: "right 0.3s ease",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Activity Feed</h3>

        <button
          onClick={onClose}
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

      <div style={{ flexGrow: 1, overflowY: "auto", paddingRight: 4 }}>
        {activity.length === 0 && (
          <p style={{ opacity: 0.6 }}>No activity yet</p>
        )}

        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {activity.map((event, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: 10,
                fontSize: 14,
                color: "#333",
              }}
            >
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
