require("express-async-errors");
require("dotenv").config();
const express = require("express");
// const {fetch} = require('./utils/pg')
const app = express();

// connectionDatabase()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require routers
app.use("/api/", require("./routes"));

// error middleware
app.use((err, req, res, next) => {
  if (err.name == "json") {
    const error = JSON.parse(err.error.message);
    return res.clearCookie(error.path).send({
      status: "err",
      message: error.message,
    });
  }
  if (err) console.log(err);
  err ? res.send({ err: err.message }) : next();
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
