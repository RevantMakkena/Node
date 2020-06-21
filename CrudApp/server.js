const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
const books = require("./data.json");

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  console.log(req.params);
  const book = books.find(
    (book) => book.id === parseInt(req.params.id)
  );
  if (!book) return res.sendStatus(404).send("Book not found");

  res.json(book);
});

app.post("/api/books", (req, res) => {
  if (req.body === undefined)
    return res.sendStatus(204).send("Couldn't find the Book Obect");

  const isBookPresent = books.find(
    (book) => book.id === parseInt(req.body.id)
  );
  if (isBookPresent)
    return res.sendStatus(302).send("Data is already present");

  const newBook = {id: books.length + 1, name: req.body.name};
  books.push(newBook);
  return res.sendStatus(200);
});

app.listen(3003, () => console.log("Listening on 3003"));
