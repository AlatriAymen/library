const Router = require("express");
const Book = require("../schemas/book");

const router = Router();

router.get("/book/:ref", async (req, res) => {
  const fetchedBook = await Book.findOne({ book_reference: req.params.ref });
  if (fetchedBook == null) {
    res.status(400);
    return res.send("Error: Invalid book reference");
  }
  var books = [];
  res.status(200);

  return res.send(books);
});

router.get("/books", async (req, res) => {
  const fetchedBooks = await Book.find({});
  var books = [];
  fetchedBooks.forEach((book) => {
    books.push(book._doc);
  });
  res.status(200);

  return res.send(books);
});

router.post("/books", async (req, res) => {
  const booksFetched = await Book.find({});

  var bookReferenceSplitted = booksFetched[
    booksFetched.length - 1
  ].book_reference.split("_");

  var newReference =
    bookReferenceSplitted[0] +
    "_" +
    (parseInt(bookReferenceSplitted[1]) + 1).toString();

  if (
    req.body.book_title == null ||
    req.body.author == null ||
    req.body.publication_year == null ||
    req.body.available_copies == null ||
    req.body.price == null
  ) {
    res.status(400);
    return res.send("Error: missing parameters");
  }

  const addedBook = Book.create({
    book_reference: newReference,
    book_title: req.body.book_title,
    author: req.body.author,
    publication_year: req.body.publication_year,
    available_copies: parseInt(req.body.available_copies),
    price: parseFloat(req.body.price),
  });
  res.status(201);
  return res.send();
});

router.delete("/books/:ref", async (req, res) => {
  const deletedBook = await Book.deleteOne({ book_reference: req.params.ref });
  if (deletedBook.deletedCount == 0) {
    res.status(400);
    return res.send("Error: Invalid book reference");
  }
  res.status(204);
  return res.send();
});

router.put("/books/:ref", async (req, res) => {
  const fetchedBook = await Book.findOne({ book_reference: req.params.ref });
  const booksFetched = await Book.updateOne(
    { book_reference: req.params.ref },
    {
      book_title:
        req.body.book_title == null
          ? fetchedBook._doc.book_title
          : req.body.book_title,
      author:
        req.body.author == null ? fetchedBook._doc.author : req.body.author,
      publication_year:
        req.body.publication_year == null
          ? fetchedBook._doc.publication_year
          : req.body.publication_year,
      available_copies:
        req.body.available_copies == null
          ? fetchedBook._doc.available_copies
          : parseInt(req.body.available_copies),
      price:
        req.body.price == null
          ? fetchedBook._doc.price
          : parseFloat(req.body.price),
    }
  );
  res.status(200);
  return res.send();
});

module.exports = router;
