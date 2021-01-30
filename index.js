const routes = require("./routes/index");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/library";

var succReqs = 0;
var errReqs = 0;
var totalReqs = 0;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to server");
  })
  .catch((error) => console.log(error));

app.use(routes.book);
app.use(routes.reservation);

app.use((req, res, next) => {
  console.log(res.statusCode);
  switch (res.statusCode) {
    case 200:
    case 201:
    case 204:
      {
        succReqs = succReqs + 1;
        totalReqs = totalReqs + 1;
      }
      break;
    case 400:
    case 404:
      {
        errReqs = errReqs + 1;

        totalReqs = totalReqs + 1;
      }
      break;
  }
  next();
});

app.get("/metrics", function (req, res) {
  res.status(200);
  res.send({
    "Successful requests": succReqs,
    "Unseccessful requests": errReqs,
    "Total requests": totalReqs,
  });
});

app.listen(8080);
