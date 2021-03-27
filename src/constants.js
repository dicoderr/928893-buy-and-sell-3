'use strict';

const ExitCode = {success: 0, error: 1};
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
};
const MAX_ID_LENGTH = 6;

module.exports = {ExitCode, HttpCode, MAX_ID_LENGTH};
