const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    book_reference: {
      type: String,
    },
    book_title: {
      type: String,
    },
    author: {
      type: String,
    },
    publication_year: {
      type: String,
    },
    available_copies: {
      type: Number,
    },
    price: {
      type: String,
    },
  },
);

module.exports = mongoose.model('books', bookSchema);
