'use strict';

const express = require(`express`);
const routes = require(`../api`);
const {HttpCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const API_PREFIX = `/api`;

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.parseInt(args[0], 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.use(API_PREFIX, routes);
    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

    app.listen(port, () => {
      return console.info(`Принимаю подключения на ${port}`);
    });
  },
};
