if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const helmet = require('helmet');
const dbUrl = process.env.DB_URL ||  'mongodb://localhost:27017/surf-shop';

// const seedPosts = require('./seeds');
// seedPosts();

// require routes
const index 	= require('./routes/index');
const posts 	= require('./routes/posts');
const reviews = require('./routes/reviews');

const app = express();
//connect to the database
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set public assets directory
app.use(express.static('public'));

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(flash());

const scriptSrcUrls = [
  "https://stackpath.bootstrapcdn.com/",
  "https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js",
  "https://api.mapbox.com/",
  "https://kit.fontawesome.com/",
  "https://cdnjs.cloudflare.com/",
  "https://use.fontawesome.com/releases/v5.15.3/js/all.js", 
  "https://code.jquery.com/jquery-3.3.1.slim.min.",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js"
];
const styleSrcUrls = [
  "https://kit-free.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/",
  "https://api.mapbox.com/",
  "https://api.tiles.mapbox.com/",
  "https://fonts.googleapis.com/",
  "https://use.fontawesome.com/",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
];
const connectSrcUrls = [
  "https://api.mapbox.com/",
  "https://*.tiles.mapbox.com",
  "https://events.mapbox.com/",
];
const fontSrcUrls = [
  "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD3gTD_vx3rCubqg.woff2",
  "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_cJD3g3D_vx3rCubqg.woff2"
];
app.use(
  helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["http://localhost:3000/"],
          connectSrc: ["'self'", ...connectSrcUrls],
          scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
          styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
          workerSrc: ["'self'", "blob:"],
          childSrc: ["blob:"],
          objectSrc: [],
          imgSrc: [
              "'self'",
              "blob:",
              "data:",
              `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/`, 
            "https://images.unsplash.com/",
              "https://res.cloudinary.com/devsprout/image/upload/v1561315599/surf-shop/surfboard.jpg"
          ],
      fontSrc: ["'self'",...fontSrcUrls],
      },
  })
);

// Add moment to ervy view
app.locals.moment = require('moment');
// Configure Passport and Sessions
app.use(session({
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set title middleware
app.use(function (req, res, next) {
  // req.user = {
  //   // '_id': '6068b8ec290be7423f4986eb',
  //   '_id': '606c502604a2c05a1b740b9e',
  //     'username' : 'will3',
  // }
  res.locals.currentUser = req.user;
  // set default page title
  res.locals.title = 'Surf Shop';
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // continue on the next function in middleware chain
  next();
});

// Mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');

});

module.exports = app;