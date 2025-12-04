const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Fake in-memory database (just for demo)
let users = [];

// REGISTER USER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  users.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// LOGIN USER
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check user
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // Create JWT token
  const token = jwt.sign({ username }, "secretKey123", { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// PROTECTED ROUTE
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, "secretKey123");
    res.json({ message: "Welcome to your dashboard", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});