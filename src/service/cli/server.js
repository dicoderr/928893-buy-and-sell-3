'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const path = require(`path`);

const FILE_NOT_FOUND_ERROR_CODE = `ENOENT`;
const HTTP_SUCCESS_CODE = 200;
const HTTP_NOT_FOUND_CODE = 404;
const HTTP_SERVER_ERROR_CODE = 500;

const notFound = (res) => {
  res.writeHead(HTTP_NOT_FOUND_CODE, {
    'Content-type': `text/plain; charset=UTF-8`,
  });
  res.end(`Not Found`);
};

const getResponseText = (data) => {
  const items = data.map(({title})=>`<li>${title}</li>`);
  return `<ul>${items}</ul>`;
};

const mocksFile = path.resolve(__dirname, `../../../mocks.json`);

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const data = await fs.readFile(mocksFile, `utf-8`);
        const responseText = getResponseText(JSON.parse(data));

        res.writeHead(HTTP_SUCCESS_CODE, {
          'Content-Type': `text/html; charset=UTF-8`,
        });
        res.end(responseText);
      } catch (e) {
        if (e.code === FILE_NOT_FOUND_ERROR_CODE) {
          notFound(res);
        } else {
          console.error(`Ошибка при обработке данных`, e);

          res.writeHead(HTTP_SERVER_ERROR_CODE, {
            'Content-type': `text/plain; charset=UTF-8`,
          });
          res.end(`Internal Server Error`);
        }
      }
      break;
    default:
      notFound(res);
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const port = Number.isInteger(+args[0]) ? args[0] : 3000;
    const server = http.createServer(onClientConnect);

    server.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании http-сервера`, err);
      }

      return console.info(`Принимаю подключения на ${port}`);
    });
  }
};
