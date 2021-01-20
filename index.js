const routes = require("./routes/index");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/library";

var reqSuccRate = 0;
var totlaReqs = 0;

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
        reqSuccRate = (reqSuccRate * totlaReqs + 1) / (totlaReqs + 1);
        totlaReqs = totlaReqs + 1;
      }
      break;
    case 400:
    case 404:
      {
        reqSuccRate = (reqSuccRate * totlaReqs) / (totlaReqs + 1);
        totlaReqs = totlaReqs + 1;
      }
      break;
  }
  console.log(totlaReqs);
  next();
});

app.get("/metric", function (req, res) {
  res.status(200);
  res.send("Success rate: " + reqSuccRate + "//" + totlaReqs);
});

app.listen(8080);
