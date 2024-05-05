const express = require('express');
const db = require('./db');

const app = express();

const PORT = 8000;

app.use(express.json());

app.get('/books', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM books WHERE id = ${req.params.id}`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/books', async (req, res) => {
  try {
    const result = await db.query(`INSERT INTO BOOKS (title, description) VALUES ('${req.body.title}', '${req.body.description}')`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const book = await db.query(`SELECT * FROM books WHERE id = ${req.params.id}`);
    if (book.rows.length === 0) {
      res.status(404).send('Book not found');
      return;
    }
    const result = await db.query(`UPDATE books SET title = '${req.body.title}', description = '${req.body.description}' WHERE id = ${req.params.id}`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.patch('/books/:id', async (req, res) => {
  try {
    const book = await db.query(`SELECT * FROM books WHERE id = ${req.params.id}`);
    if (book.rows.length === 0) {
      res.status(404).send('Book not found');
      return;
    }

    const title = req.body.title || book.rows[0].title;
    const description = req.body.description || book.rows[0].description;

    const result = await db.query(`UPDATE books SET title = '${title}', description = '${description}' WHERE id = ${req.params.id}`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const result = await db.query(`DELETE FROM books WHERE id = ${req.params.id}`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});