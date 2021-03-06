require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const logger = require("morgan");
const path = require("path");
const passport = require('passport');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const multer = require('multer');

mongoose
  .connect(
    process.env.DBURL,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

//SESSION MIDDLEWARE
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 30000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }

  next();
});

require('./passport')(app);

app.use(flash());

// default value for title local
app.use((req, res, next) => {
  app.locals.title = "TimbApp - Your app to find poker games and partners";
  app.locals.user = req.user;
  next();
})

const index = require("./routes/index");
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require('./routes/user'); // ruta fisica
app.use("/", index);
app.use("/auth", authRoutes);
app.use('/player', userRoutes); // prefijo ruta navegador
app.use("/game", gameRoutes);
app.use("/review", reviewRoutes);

module.exports = app;
