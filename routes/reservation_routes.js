const Router = require("express");
const Reservation = require("../schemas/reservation");
const Book = require("../schemas/book");
var crypto = require("crypto");
const reservation = require("../schemas/reservation");
var shasum = crypto.createHash("sha1");

const router = Router();

router.get("/reservations/:id", async (req, res) => {
  const fetchedReservation = await Reservation.findOne({
    reservation_id: req.params.id,
  });

  if (fetchedReservation == null) {
    res.status(400);
    return res.send("Error: Invalid reservation id");
  }
  console.log(fetchedReservation);
  res.status(200);

  return res.send(fetchedReservation);
});

router.get("/reservations", async (req, res) => {
  const fetchedReservations = await Reservation.find({});
  var reservations = [];
  fetchedReservations.forEach((reservation) => {
    reservations.push(reservation._doc);
  });
  res.status(200);

  return res.send(reservations);
});

router.post("/reservations", async (req, res) => {
  const fetchedReservations = await Reservation.find({});
  var newId;
  if (fetchedReservations.length == 0) {
    newId = "res_000";
  } else {
    var reservationIdSplitted = fetchedReservations[
      fetchedReservations.length - 1
    ].reservation_id.split("_");

    newId =
      reservationIdSplitted[0] +
      "_" +
      (parseInt(reservationIdSplitted[1]) + 1).toString();
  }

  var currentDate = new Date();
  var reservationDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  var pickupDate = new Date();
  pickupDate.setDate(currentDate.getDate() + 3);

  if (req.body.book_reference == null || req.body.book_reference == "") {
    res.status(400);
    return res.send("Error:book_reference is missing");
  }

  const fetchedBook = await Book.find({
    book_reference: req.body.book_reference,
  });
  if (fetchedBook.length == 0) {
    res.status(400);
    return res.send("Error: Invalid book reference");
  }

  shasum.update(newId + req.body.book_reference.toString());

  const addedReservation = Reservation.create({
    reservation_id: newId,
    reservation_date: reservationDate,
    pickup_date: pickupDate,
    book_reference: req.body.book_reference,
    reservation_code: shasum.digest("hex"),
  });
  res.status(201);
  return res.send("reservation is created successfully");
});

router.delete("/reservations/:id", async (req, res) => {
  const deletedReservation = await Reservation.deleteOne({
    reservation_id: req.params.id,
  });

  if (deletedReservation.deletedCount == 0) {
    res.status(400);
    return res.send("Error: Invalid reservation id");
  }

  res.status(204);
  return res.send();
});

module.exports = router;
