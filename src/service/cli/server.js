'use strict';

const express = require(`express`);
const offersRoutes = require(`./routes/offers-routes`);

const HTTP_NOT_FOUND_CODE = 404;


module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.isInteger(+args[0]) ? args[0] : 3000;

    const app = express();
    app.use(express.json());

    app.use(`/offers`, offersRoutes);
    app.use((req, res) => res.status(HTTP_NOT_FOUND_CODE).send(`Not found`));

    app.listen(port, () => {
      return console.info(`Принимаю подключения на ${port}`);
    });
  }
};
