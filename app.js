require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/Youth");

/**
 * Controllers (route handlers).
 */
//const userController = require("./controllers/user");
const youthController = require("./controllers/youth");
const quoteController = require("./controllers/quote");
const youthApiController = require("./controllers/api/youth");
const attendanceController = require("./controllers/attendance");
const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */
const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }));

global.user = false;
app.use("*", async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

app.get("/", quoteController.quote);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})



app.get("/test", async (req, res) => {
  res.render('test');
})

app.get("/join", (req, res) => {
  res.render('create-user', { errors: {} })
});
app.post("/join", youthController.create);

app.get("/login", (req, res) => {
  res.render('login-user', { errors: {} })
});
app.post("/login", youthController.login);

app.get("/view-profile", youthController.ViewProfile);
app.get("/view_profile/delete/:id", youthController.DeleteProfile);
app.get("/view_profile/edit/:id", youthController.EditProfile);
app.post("/view_profile/edit/:id", youthController.Update);

app.get("/all-profiles", authMiddleware, youthController.AllProfiles);

app.get("/api/search-youth", youthApiController.list);

app.get("/schedule", authMiddleware, attendanceController.AttendanceList);

app.get("/attend", (req, res) => {
  res.render("add-attendance");
});
app.post("/attend/:id", attendanceController.UpdateAttendance);

app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});