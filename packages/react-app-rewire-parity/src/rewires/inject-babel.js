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

const path = require('path');
const { getBabelLoader } = require('react-app-rewired');

const { createLoaderMatcher, findIndexAndRules } = require('./utils');

module.exports = function injectBabel (config) {
  const { index, rules } = findIndexAndRules(config.module.rules, createLoaderMatcher('babel-loader'));

  // Add current directory to babel loader, used to compile the `parity-inject-script`
  // script
  rules[index].include = [].concat(
    rules[index].include || [],
    path.resolve(__dirname, '..')
  );

  const babelLoader = getBabelLoader(config.module.rules);

  babelLoader.options = Object.assign({}, babelLoader.options, {
    babelrc: false,
    presets: [ require.resolve('babel-preset-parity') ]
  });

  return config;
};
