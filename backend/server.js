const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  const { user, filter } = req.query;
  let query = 'SELECT * FROM todos';
  const params = [];

  if (user) {
    query += ' WHERE user = ?';
    params.push(user);
  }

  if (filter === 'completed') {
    query += user ? ' AND completed = 1' : ' WHERE completed = 1';
  } else if (filter === 'incomplete') {
    query += user ? ' AND completed = 0' : ' WHERE completed = 0';
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ status: true, data: rows });
  });
});

app.post('/todos', (req, res) => {
  const { text, user } = req.body;
  db.run('INSERT INTO todos (text, user) VALUES (?, ?)', [text, user], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ status: true, id: this.lastID });
  });
});

app.patch('/todos/:id', (req, res) => {
  const { completed, text, user } = req.body;
  let query = 'UPDATE todos SET ';
  const params = [];

  if (completed !== undefined) {
    query += 'completed = ?, ';
    params.push(completed);
  }
  if (text) {
    query += 'text = ?, ';
    params.push(text);
  }
  if (user !== undefined) {
    query += 'user = ?, ';
    params.push(user);
  }

  query = query.slice(0, -2); // Remove the last comma and space
  query += ' WHERE id = ?';
  params.push(req.params.id);

  db.run(query, params, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ status: true, message: 'Todo updated successfully' });
  });
});

app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ status: true, message: 'Todo deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});