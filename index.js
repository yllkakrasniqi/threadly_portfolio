const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const router = require("./src/router");

const PORT = 3003;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
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
    res.send("Hello world\n");
});

app.use('', router)

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});