require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const tradesRouter = require("./routes/tradesRouter");
const balanceRouter = require("./routes/balanceRouter");

const app = express();

app.use(express.json());

const url = process.env.DB;
mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect :(", error));

app.use("/api/v1/trades", tradesRouter);
app.use("/api/v1/balance", balanceRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
