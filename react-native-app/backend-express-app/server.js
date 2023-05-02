const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");
const serverless = require("serverless-http");
const fs = require("fs");
const ip = "localhost";

require("dotenv").config();

// Route imports

//Imports userRoutes from ./routes/users.js
const usersRouter = require("./routes/users");

//Imports authRouter from ./routes/auth.js
const authRouter = require("./routes/auth");

const updateRouter = require("./routes/updateUser");

const getUserRouter = require("./routes/getUserData");

const listingsRouter = require("./routes/listings");
const householdRouter = require("./routes/household");
const reminderRouter = require("./routes/reminders");

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

/*const httpsOptions = {
    key: fs.readFileSync('path to key.pem'),
    cert: fs.readFileSync('path to cert.pem')
};*/

//Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var corsOptions = {
  origin: ["http://localhost:19006", "http://" + ip + ":19006"],
  credentials: true,
};
app.use(cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/update", updateRouter);
app.use("/get", getUserRouter);
app.use("/listings", listingsRouter);
app.use("/household", householdRouter);
app.use("/reminders", reminderRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.use("/.netlify/routes/users", usersRouter);
app.use("/.netlify/routes/auth", authRouter);
app.use("/.netlify/routes/update", updateRouter);
app.use("/.netlify/routes/get", getUserRouter);
app.use("/.netlify/routes/listings", listingsRouter);
app.use("/.netlify/routes/household", householdRouter);
app.use("/.netlify/routes/reminders", reminderRouter);

app.use("/.netlify/routes/server", router);  // path must route to lambda
module.exports.handler = serverless(app);

/*https.createServer(options, app).listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/
