'use strict';

const {Cli} = require(`./cli`);

const DEFAULT_COMMAND = `--version`;
const ExitCode = {success: 0, error: 1};

const args = process.argv.slice(2);
const [cmd] = args;

if (args.length === 0 || !Cli[cmd]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[cmd].run(args.slice(1));
