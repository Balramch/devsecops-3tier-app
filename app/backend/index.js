const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "root",
//   database: "appdb"
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // ✅ Uses 'db' from Docker
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});


db.connect((err) => {
  if (err) {
    console.error("DB ERROR:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// Health route
// app.get("/", (req, res) => {
//   res.json({ status: "OK", message: "Backend running" });
// });

// ✅ HEALTH CHECK ROUTE (PUT IT HERE)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// READ
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/users", (req, res) => {
  console.log("BODY:", req.body);

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).send(err);
      }

      console.log("Inserted ID:", result.insertId);
      res.json({ id: result.insertId });
    }
  );
});

// DELETE
app.delete("/users/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Deleted" });
    }
  );
});

app.listen(5001, "0.0.0.0", () => {
  console.log("Backend running on port 5001");
});
