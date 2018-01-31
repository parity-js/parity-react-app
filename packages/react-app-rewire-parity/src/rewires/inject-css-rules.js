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

const cloneDeep = require('lodash.clonedeep');
const { loaderNameMatches } = require('react-app-rewired');

const { addBeforeRule, findRule } = require('./utils');

module.exports = function injectCSSRules (config) {
  const cssRuleMatcher = (rule) => rule.test && String(rule.test) === String(/\.css$/);
  const cssLoaderMatcher = (rule) => loaderNameMatches(rule, 'css-loader');
  const fileLoaderMatcher = (rule) => loaderNameMatches(rule, 'file-loader');
  const postcssLoaderMatcher = (rule) => loaderNameMatches(rule, 'postcss-loader');

  const cssModulesRule = findRule(config.module.rules, cssRuleMatcher);
  const cssRule = cloneDeep(cssModulesRule);
  const cssLoader = findRule(cssRule, cssLoaderMatcher);
  const postcssLoader = findRule(cssRule, postcssLoaderMatcher);

  // Original rule only for Node modules
  cssModulesRule.include = /node_modules/;

  // Project CSS always use modules
  cssRule.exclude = /node_modules/;
  cssLoader.options = Object.assign({
    modules: true,
    localIdentName: '[name]_[local]_[hash:base64:10]'
  }, cssLoader.options);

  // Add postcss plugins
  const postcssPlugins = postcssLoader.options.plugins();

  postcssLoader.options.plugins = () => {
    return [].concat(
      postcssPlugins,

      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-simple-vars')
    );
  };

  addBeforeRule(config.module.rules, fileLoaderMatcher, cssRule);

  return config;
};
