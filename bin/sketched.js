#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../package');
const parse = require('../lib/parse');

program
    .version(packageInfo.version)
    .option('-f --file [source]', 'Source .sketch file')
    .parse(process.argv);

if (program.file) {
    parse(program.file);
} else {
    program.help();
}
