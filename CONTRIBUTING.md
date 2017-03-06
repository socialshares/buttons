There is currently no complex process for contributing to the project. Once you have cloned the repository and made your changes, create a new pull request. See below for getting setup.

## Development setup

Development is fairly simple, just install the dependencies with `npm install` and then start the server with `npm start`. Notice that the JavaScript is written in [ES2015 (ES6)](https://babeljs.io/docs/learn-es2015/) and the CSS is written in [cssnext](http://cssnext.io/).

## Publishing new version (note to self)

- `yarn run release`
- Manually update bower.json version
- `git push`
- `npm publish`
