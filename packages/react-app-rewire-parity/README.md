# Rewire create-react-app à la Parity

This is a set of _rewires_ that can be used with `react-app-rewired`
to add missing functionalities of Create React App.

## Usage

Create a file named `config-overrides.js` at the root of your project,
with this format:

```javascript
const path = require('path');
const rewireParity = require('react-app-rewire-parity');

module.exports = (config) => {
  const options = {
    // Optional title of your HTML page
    htmlTitle: 'My React App',

    // Optional path of you favicon image (see https://github.com/jantimon/favicons-webpack-plugin)
    favicon: path.resolve(__dirname, 'src/logo.png')
  };


  config = rewireParity(config, options);

  return config;
};
```

## What rewires are included?

This include a selection of rewires:

### Babel

It uses the `babel-preset-parity` Babel preset for your app.

### CSS

It adds CSS modules by default for the project CSS files,
while keeping the current Create React App behaviour for CSS
files in `node_modules` directory.

It also adds some post-css plugins:

- `postcss-import`
- `postcss-nested`
- `postcss-simple-vars`

### EJS

It adds an EJS loader for `.ejs` files

### ESLint

It uses the `eslint-config-parity` ESLint config for the project

### React Hot Loader

It enables React Hot Loader by default!
To make it even more convenient, it expects the project `src/index.js` file
to export a React component that will be mounted on the main DIV.

### Webpack HTML Plugin

It uses a custom `index.html` file for the project.

### Parity inject script

If the `DAPP` environment variable is set,
it t adds in development mode the standard Parity `inject.js` script
that is used for Dapps to inject an Ethereum provider instance.

### Remove required files

It removes the required `index.html` file that is no more needed.
