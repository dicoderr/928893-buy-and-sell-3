'use strict';

const path = require(`path`);
const fs = require(`fs`).promises;
const {Router} = require(`express`);

const router = new Router();
const mocksFile = path.resolve(__dirname, `../../../../mocks.json`);

router.get(`/`, async (req, res) => {
  try {
    const data = await fs.readFile(mocksFile, `utf-8`);
    const mocks = JSON.parse(data);
    res.json(mocks);
  } catch (e) {
    res.json([]);
  }
});

module.exports = router;
