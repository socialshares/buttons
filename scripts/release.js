#! /usr/bin/env node
const inquirer = require('inquirer')
const colors = require('colors')

echo(`socialshares release | current: v${env.npm_package_version}\n`.bold.magenta)

inquirer.prompt([
  {
    name: 'version',
    message: 'What type of version release is this?',
    type: 'list',
    choices: ['major', 'minor', 'patch', 'custom'],
  },
]).then(answers => {
  const npmVersion = version => {
    exec(`npm version ${version}`, code => {
      if (code === 1) {
        echo('\nRelease error, check output above.'.red)
        return
      }

      echo('\nsocialshares released!'.green)
    })
  };

  if (answers.version === 'custom') {
    inquirer.prompt([
      {
        name: 'version',
        message: 'Enter the new release version number (MAJOR.MINOR.PATCH):',
      },
    ]).then(answers => { npmVersion(answers.version) })
  } else {
    npmVersion(answers.version)
  }
})
