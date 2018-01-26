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

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const { replacePlugin } = require('./utils');

const INDEX_PATH = path.resolve(__dirname, 'index.ejs');

module.exports = function injectHTMLPlugin (config) {
  const htmlPlugin = new HtmlWebpackPlugin(
    {
      inject: true,
      template: INDEX_PATH
    }
  );

  config.plugins = replacePlugin(config.plugins, (name) => /HtmlWebpackPlugin/i.test(name), htmlPlugin);

  return config;
};
