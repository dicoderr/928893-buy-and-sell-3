'use strict';

const path = require(`path`);
const express = require(`express`);

const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app
  .listen(DEFAULT_PORT, () => {
    console.log(`App is listening at http://localhost:${DEFAULT_PORT}`);
  })
  .on(`error`, (err) => {
    console.log(`Something went wrong: ${err.message}`);
  });
