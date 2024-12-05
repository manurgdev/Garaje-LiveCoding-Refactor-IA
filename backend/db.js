const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./todo.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      user TEXT NOT NULL DEFAULT ''
    )`, (err) => {
      if (err) {
        console.error('Error creating table', err);
      } else {
        console.log('Todos table created or already exists.');
      }
    });
  }
});

module.exports = db;