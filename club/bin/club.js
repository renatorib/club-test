#!/usr/bin/env node

const yargs = require('yargs');

const commonArgs = {
  'port': {
    alias: 'p',
    default: 3000
  }
};

yargs
  .usage('$0 <cmd> [args]')
  .command('start', 'run development server', commonArgs, (argv) => {
    require('../scripts/start')();
  })
  // .command('build', 'build production version of app', {}, (argv) => {
  //   require('../scripts/build')();
  // })
  .help()
  .argv;
