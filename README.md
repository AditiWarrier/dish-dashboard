# Dish Dashboard — Full Stack Assignment

This is my submission for the Full Stack Problem Statement.  
The project includes a backend (Express + SQLite), a frontend (React), and real-time updates using Socket.IO.

---

## 🚀 Features

### ✅ 1. Fetch All Dishes  
- All dishes (id, name, image, published status) are stored in an SQLite database.  
- The frontend loads them using a GET API.

### ✅ 2. Toggle Publish / Unpublish  
- Each dish can be published or unpublished from the dashboard.  
- A PATCH API updates the database and the UI instantly.

### ✅ 3. Real-Time Updates (Bonus)  
- If a dish is updated **from outside the dashboard** (ex: backend terminal),  
  the UI updates automatically without refreshing.
- A yellow highlight shows which dish was externally updated.
- The dashboard auto-resyncs if it reconnects after being disconnected.

### ✅ 4. Activity Panel  
- Shows the last 5 actions (dashboard + external updates).
- Can be opened from the “Activity” button on the top right.

---

## 🧱 Tech Stack

### **Backend**
- Node.js  
- Express  
- SQLite  
- Socket.IO  

### **Frontend**
- React  
- Parcel bundler  
- Socket.IO client  

---

## 📁 Project Structure

```
dish-dashboard/
│
├── backend/
│   ├── server.js          # APIs + real-time events
│   ├── db.js               # SQLite setup + initial data
│   ├── seed.json           # Provided dish data
│   └── data.sqlite         # Database file
│
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main dashboard logic
│   │   ├── DishCard.js     # Each dish card
│   │   └── ActivityPanel.js# Slide-in activity panel
│   ├── index.html
│   ├── styles.css
│   └── package.json
│
└── README.md
```

---

## 📦 Installation & Running

### **1. Start Backend**
```sh
cd backend
npm install
node server.js
```
Backend runs at:  
👉 **http://localhost:4000**

---

### **2. Start Frontend**
```sh
cd frontend
npm install
npm start
```
Frontend runs at:  
👉 **http://localhost:3000**

---

## 🔗 API Endpoints

### **GET /api/dishes**
Returns all dishes.

### **PATCH /api/dishes/:id/toggle**
Toggles published/unpublished status  
and emits a `dishUpdated` event through Socket.IO.

---

## ⚡ Real-Time Behavior

### The frontend updates instantly when:
- A dish is toggled from the dashboard  
- A dish is updated externally (via backend terminal)  
- The dashboard reconnects after losing connection  

Real-time events are handled using:
```js
socket.on("dishUpdated", ...)
```

---

## 📝 Notes

- The project focuses mainly on backend, real-time logic, and API behavior.
- The UI is clean and functional, designed to present the required features clearly.

---

## 🎥 Submission Includes
✔ 1-minute demo video  
✔ 1-minute code explanation  
✔ GitHub repo with complete code  

---

## 📌 Author
**Aditi Warrier**

