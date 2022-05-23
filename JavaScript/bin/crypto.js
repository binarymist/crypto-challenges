#!/usr/bin/env node

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { exports } = require('../package');

const { default: start } = await import(`.${exports}`);

function main() {
  start({ functionToRun: process.argv[2], argsToFunction: process.argv.slice(3) });
}

main();
