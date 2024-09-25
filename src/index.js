const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const config = require('./config');
const router = require("./router");
const connectDB = require("./db/index")

const PORT = config.app.port;

const app = express();

app.use(
  cors({
    origin: config.app.cors_origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "auth-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use('', router)

app.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server listening on ${PORT}`)
  })
});