const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary database (in-memory)
let users = [];

// ================= REGISTER API =================
app.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ name, email, password });
  console.log("Registered users:", users);

  res.json({ message: "Registration successful" });
});

// ================= LOGIN API =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (users) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ================= VIEW ALL USERS (STORED DETAILS) =================
app.get("/users", (req, res) => {
  if (users.length === 0) {
    return res.json({ message: "No users registered yet", users: [] });
  }
  res.json({ message: "All registered users", count: users.length, users });
});

// ================= VIEW SINGLE USER BY EMAIL =================
app.get("/users/:email", (req, res) => {
  const user = users.find(u => u.email === req.params.email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User found", user });
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});