require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const session = require("express-session");
const cookieparser = require("cookie-parser");
const fileupload = require("express-fileupload");

// Database connection
require("./models/database").connectDatabase();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(logger("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());
app.use(fileupload());

// Routes
app.use("/", require("./routes/indexRouter"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));

// Error handling
const { generatedError } = require("./middlewares/errors");
const ErrorHandler = require("./utils/ErrorHandler");
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL not found ${req.url}`));
});
app.use(generatedError);

// Start the server
const port = process.env.PORT || 3000; // Use the port from environment variables or default to 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
