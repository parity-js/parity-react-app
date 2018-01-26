// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const injectBabel = require('./src/inject-babel');
const injectCSSRules = require('./src/inject-css-rules');
const injectEJSLoader = require('./src/inject-ejs-loader');
const injectEslintConfig = require('./src/inject-eslint-config');
const injectHotLoader = require('./src/inject-hot-loader');
const injectIndex = require('./src/inject-index');
const injectHTMLPlugin = require('./src/inject-html-plugin');
const injectParity = require('./src/inject-parity');
const injectPlugins = require('./src/inject-plugins');

const removeRequiredFiles = require('./src/remove-required-files');

module.exports = function rewireParity (config) {
  // Prevent browser auto-open
  process.env.BROWSER = 'none';

  // Set a different default port
  process.env.PORT = process.env.PORT || 3001;

  // Use relative public URLs
  process.env.PUBLIC_URL = './';

  // Remove index.html as required
  removeRequiredFiles((file) => /index\.html$/.test(file));

  // Inject index JS page
  config = injectIndex(config);

  // Inject React Hot Loader
  config = injectHotLoader(config);

  // Inject misc. Webpack plugins
  config = injectPlugins(config);

  // Inject Parity injection script
  config = injectParity(config);

  // Inject Eslint custom config
  config = injectEslintConfig(config);

  // Inject custom CSS rules
  config = injectCSSRules(config);

  // Add an EJS loader
  config = injectEJSLoader(config);

  // Inject custom Babel rules
  config = injectBabel(config);

  // Change the Webpack HTML Plugin
  config = injectHTMLPlugin(config);

  return config;
};
