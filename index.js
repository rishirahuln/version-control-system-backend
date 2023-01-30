require("dotenv").config();
const express = require("express");
const db = require("./db/connection.db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Importing routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const repoRoutes = require("./routes/repo.routes");

const { isAuth } = require("./middlewares/authentication");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome!!!");
});

app.use("/api", authRoutes);
app.use("/api", isAuth, userRoutes);
app.use("/api/repo", isAuth, repoRoutes);

//Connecting DB
db();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
