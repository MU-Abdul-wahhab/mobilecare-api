const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const { xss } = require("express-xss-sanitizer");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");
const globalError = require('./controller/errorController');


const limit = rateLimiter({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  message: "Too Many Request From the Client",
});

app.use(helmet());
app.use(mongoSanitize());
app.use(limit);
app.use(xss());
app.use(
  hpp({
    whitelist: [],
  })
);

app.use(cors());

app.use(
  express.json({
    limit: "10KB",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(`${__dirname}/public`));

const authRouter = require("./routes/authRouter");
const appError = require("./utils/appError");

// Routers stars
app.use("/api/v1/auth", authRouter);
// Routers ends

app.all("*", (req, res, next) => {
 
  next(new appError(`Can not find ${req.originalUrl} on this server`, 404));

});

app.use(globalError);



module.exports = app;
