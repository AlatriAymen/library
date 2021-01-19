const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservaitonSchema = new Schema(
  {
    reservation_id: {
      type: String,
    },
    reservation_date: {
      type: Date,
    },
    pickup_date: {
      type: Date,
    },
    book_reference: {
      type: String,
    },
    reservation_code: {
      type: String,
    },
  },
);

module.exports = mongoose.model('reservations', reservaitonSchema);
