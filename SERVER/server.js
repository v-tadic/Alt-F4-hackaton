const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Konekcija sa bazom
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Greška sa bazom:", err.message);
    process.exit(1); // prekida server ako nema baze
  } else {
    console.log("Baza povezana");
  }
});

// Kreiranje tabele
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// Test ruta
app.get("/", (req, res) => {
  res.send("Backend radi 💪");
});

// READ – sve aktivnosti
app.get("/activities", (req, res) => {
  db.all("SELECT * FROM activities", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// CREATE – nova aktivnost
app.post("/activities", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text je obavezan" });
  }

  db.run(
    "INSERT INTO activities (text, done) VALUES (?, 0)",
    [text.trim()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        text: text.trim(),
        done: 0
      });
    }
  );
});

// UPDATE – checkbox (done / not done)
app.put("/activities/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  if (done !== 0 && done !== 1) {
    return res.status(400).json({ error: "Done mora biti 0 ili 1" });
  }

  db.run(
    "UPDATE activities SET done = ? WHERE id = ?",
    [done, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ updated: this.changes });
    }
  );
});

// DELETE – brisanje aktivnosti
app.delete("/activities/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM activities WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ deleted: this.changes });
    }
  );
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});
