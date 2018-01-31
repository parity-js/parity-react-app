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

const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = function injectIndex (config) {
  const entryIndex = config.entry.findIndex((entry) => entry === paths.appIndexJs);

  if (entryIndex === -1) {
    console.warn('Could not find the index JS file in Webpack entries');
    return config;
  }

  // Entry should be at `<root>/src/index.js`
  // This automatically adds React Hot Loader
  config.resolve.alias['Application'] = paths.appIndexJs;
  config.entry[entryIndex] = path.resolve(__dirname, '../app.index.js');

  return config;
};
