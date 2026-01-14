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
    process.exit(1);
  } else {
    console.log("Baza povezana");
  }
});

/* =========================
   USERS TABELA (NOVA)
========================= */
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

/* =========================
   ACTIVITIES TABELA (IZMENJENA)
========================= */
db.run(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Test ruta
app.get("/", (req, res) => {
  res.send("Backend radi 💪");
});

/* =========================
   READ – aktivnosti po useru
========================= */
app.get("/activities/:userId", (req, res) => {
  const { userId } = req.params;

  db.all(
    "SELECT * FROM activities WHERE user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

/* =========================
   CREATE – nova aktivnost
========================= */
app.post("/activities", (req, res) => {
  const { userId, text } = req.body;

  if (!userId || !text || text.trim() === "") {
    return res.status(400).json({ error: "Nedostaju podaci" });
  }

  db.run(
    "INSERT INTO activities (user_id, text, done) VALUES (?, ?, 0)",
    [userId, text.trim()],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        id: this.lastID,
        user_id: userId,
        text: text.trim(),
        done: 0
      });
    }
  );
});

/* =========================
   UPDATE – done checkbox
========================= */
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

/* =========================
   DELETE – brisanje
========================= */
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

// Server
app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});




/* =========================
   SIGNUP – registracija korisnika
========================= */
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Sva polja su obavezna" });
  }

  // Provera da li username već postoji
  db.get("SELECT id FROM users WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ error: "Greška sa bazom" });

    if (row) {
      return res.status(409).json({ error: "Username već postoji" });
    }

    // Ako ne postoji → upis u bazu
    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      function (err) {
        if (err) return res.status(500).json({ error: "Greška sa bazom" });

        res.status(201).json({
          message: "Korisnik uspešno registrovan",
          userId: this.lastID
        });
      }
    );
  });
});

/* =========================
   LOGIN – prijava korisnika
========================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email i password su obavezni" });
  }

  db.get("SELECT id, username, password FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Greška sa bazom" });

    if (!user) {
      return res.status(404).json({ error: "Korisnik ne postoji" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Pogrešan password" });
    }

    res.json({
      message: "Uspešno ulogovan",
      userId: user.id,
      username: user.username
    });
  });
});
