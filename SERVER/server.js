const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// =========================
// Konekcija sa bazom
// =========================
const dbPath = path.resolve(__dirname, "database.db");
// fs.unlinkSync(dbPath); // Ako želiš brisanje stare baze pri svakom startu

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Greška sa bazom:", err.message);
    process.exit(1);
  } else {
    console.log("Baza povezana:", dbPath);
  }
});

// Omogući foreign keys
db.run("PRAGMA foreign_keys = ON");

// =========================
// USERS tabela
// =========================
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// =========================
// ACTIVITIES tabela sa streak
// =========================
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    streak_goal INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
  )
`);

// =========================
// TEST ruta
// =========================
app.get("/", (req, res) => res.send("Backend radi 💪"));

// =========================
// USERS rute
// =========================
app.get("/users", (req, res) => {
  db.all("SELECT userId, username, email FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "Sva polja su obavezna" });

  db.get("SELECT userId FROM users WHERE email = ? OR username = ?", [email, username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(409).json({ error: "Korisnik već postoji" });

    db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Korisnik registrovan", userId: this.lastID });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email i password su obavezni" });

  db.get("SELECT userId, username, password FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: "Korisnik ne postoji" });
    if (user.password !== password) return res.status(401).json({ error: "Pogrešan password" });

    res.json({ message: "Uspešan login", userId: user.userId, username: user.username });
  });
});

// =========================
// ACTIVITIES rute
// =========================
app.get("/activities/:userId", (req, res) => {
  const { userId } = req.params;
  db.all("SELECT * FROM activities WHERE userId = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Dodavanje nove aktivnosti sa streak_goal
app.post("/activities", (req, res) => {
  const { userId, text, streak_goal } = req.body;
  if (!userId || !text) return res.status(400).json({ error: "Nedostaju podaci" });

  db.run(
    "INSERT INTO activities (userId, text, done, streak_goal, current_streak) VALUES (?, ?, 0, ?, 0)",
    [userId, text, streak_goal || 0],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ 
        id: this.lastID, 
        userId, 
        text, 
        done: 0, 
        streak_goal: streak_goal || 0, 
        current_streak: 0 
      });
    }
  );
});

// Update done i streak
app.put("/activities/:id/done", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  if (done !== 0 && done !== 1) return res.status(400).json({ error: "Done mora biti 0 ili 1" });

  db.get("SELECT current_streak, streak_goal FROM activities WHERE id = ?", [id], (err, activity) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!activity) return res.status(404).json({ error: "Task ne postoji" });

    let new_streak = activity.current_streak;
    if (done === 1) new_streak += 1;
    else new_streak = 0;

    db.run(
      "UPDATE activities SET done = ?, current_streak = ? WHERE id = ?",
      [done, new_streak, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes, current_streak: new_streak, streak_goal: activity.streak_goal });
      }
    );
  });
});

// Brisanje aktivnosti
app.delete("/activities/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM activities WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =========================
// Pokretanje servera
// =========================
app.listen(PORT, () => console.log(`Server radi na http://localhost:${PORT}`));
