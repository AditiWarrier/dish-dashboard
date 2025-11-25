// server.js
const express = require("express");
const cors = require("cors");
const http = require("http");
const db = require("./db");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Helper: fetch all dishes from DB
function getAllDishes() {
  const rows = db.prepare("SELECT * FROM dishes").all();
  return rows.map(r => ({
    ...r,
    isPublished: Boolean(r.isPublished),
  }));
}

// GET /api/dishes → Returns all dishes
app.get("/api/dishes", (req, res) => {
  const dishes = getAllDishes();
  res.json(dishes);
});

// PATCH /api/dishes/:id/toggle → Toggle publish state
app.patch("/api/dishes/:id/toggle", (req, res) => {
  const dishId = req.params.id;

  const dish = db.prepare("SELECT * FROM dishes WHERE dishId = ?").get(dishId);
  if (!dish) return res.status(404).json({ error: "Dish not found" });

  const newStatus = dish.isPublished ? 0 : 1;

  db.prepare("UPDATE dishes SET isPublished = ? WHERE dishId = ?")
    .run(newStatus, dishId);

  const updatedDish = db.prepare("SELECT * FROM dishes WHERE dishId = ?").get(dishId);
  updatedDish.isPublished = Boolean(updatedDish.isPublished);

  // real-time update
  io.emit("dishUpdated", updatedDish);

  res.json(updatedDish);
});

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Start server
server.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
