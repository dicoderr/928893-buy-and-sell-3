'use strict';

const {ExitCode} = require(`../constants`);
const {Cli} = require(`./cli`);

const DEFAULT_COMMAND = `--version`;
const USER_ARGV_INDEX = 2;

const args = process.argv.slice(USER_ARGV_INDEX);
const [cmd] = args;

if (args.length === 0 || !Cli[cmd]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[cmd].run(args.slice(1));
