#! /usr/bin/env node
var prompt = require('prompt');

prompt.start();

echo('What type of version release is this (major, minor, patch, or new version number)?');
prompt.get(['version'], function (error, result) {
  var version = result.version;

  var newVersion = exec('npm version '+version, {silent: true}).stdout.replace(/(\r\n|\n|\r)/gm, '');

  echo('Pushing to GitHub');
  exec('git push && git push --tags');

  echo('\r\nsocialshares '+newVersion+' released!');

});
