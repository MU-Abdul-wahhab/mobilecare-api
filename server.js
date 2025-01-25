const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT || 3000;

const DB = process.env.DB_PATH.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB Connection Successfull");
});

const server = app.listen(port, () => {
  console.log(`Server is Running On Port Number ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
