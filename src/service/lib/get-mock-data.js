'use strict';

const path = require(`path`);
const fs = require(`fs`).promises;

const mocksFile = path.resolve(__dirname, `../../../mocks.json`);
let data = null;

const getMockData = async () => {
  if (data) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(mocksFile, `utf-8`);
    data = JSON.parse(fileContent);
  } catch (e) {
    console.log(`Error while generating mocks file`, e);
    return Promise.resolve([]);
  }

  return Promise.resolve(data);
};

module.exports = {getMockData};
