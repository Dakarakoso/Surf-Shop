# Surf-Shop

Here you can check the applicaiton: https://secure-citadel-16322.herokuapp.com/

This project is for people who wants to sell surfboards. Users can creat an account and post photos and give a reviews in each post. The application also includes geocoding, users can share the location. Here are some the features that the application has:

- authentication
- authorization
- search filter
- reset password
- upload photos
- Display location on map

# Tools used

- Node.Js
- MongoDB
- Bootstrap
- ejs

# Setting up 

## Running in your local machine 

First you need to include a  `.env` file as follows:

```
CLOUDINARY_NAME=<YOUR ACCOUNT>
CLOUDINARY_KEY=<YOUR KEY>
CLOUDINARY_SECRET=<YOUR SECRET>
MAPBOX_TOKEN=<YOUR TOKEN>
SENDGRID_API_KEY=<YOUR API KEY>
DB_URL=<YOUR ACCOUNT NAME AND SECRET>
```
Next remove this piece of code from app.js file

```
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
```

And the lastly change the variable `const dbUrl`

```
- const dbUrl = process.env.DB_URL ||  'mongodb://localhost:27017/surf-shop';
+ const dbUrl = 'mongodb://localhost:27017/surf-shop';
```

# Npm

learn more about npm here: https://docs.npmjs.com/about-npm

Now run `npm install` to install all the node modules.

```
npm install

```

if you don't have already install nodemon and then from the surfshop directory run nodemon

```
nodemon

```
In your brwoser search tab type http://localhost:3000/

