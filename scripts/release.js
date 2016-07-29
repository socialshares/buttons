#! /usr/bin/env node
const prompt = require('prompt');

prompt.start();

echo('What type of version release is this (major, minor, patch, or new version number)?');
prompt.get(['version'], function (error, result) {

  exec('npm version '+result.version);

  echo('\r\nsocialshares released!');

});
