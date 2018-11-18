'use strict';
const React = require('react');
const icon = require('./Preview/assets/img/cerebro-define-icon.png');
const Preview = require('./Preview').default;
const { memoize } = require('cerebro-tools');
const MerriamWebster = require('./Dictionaries/MerriamWebster');

/**
 *
 * @desc Function generator that requests a word from a dictionary API
 * @param  {Object} dictionary, {String} query
 * @return {Promise}
 */
const fetchWord = dictionary => query => {
  return fetch(dictionary.api(query))
    .then((response) => response.json())
    .then(({responseJson}) => {
      return responseJson.map(dictionary.normalize);
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 *
 * @desc Fetch words with caching
 * @type {Function}
 */
const cachedFetchWord = memoize(fetchWord(MerriamWebster));

/**
 *
 * @desc Cerebro plugin to define words, cross-platform
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const plugin = (scope) => {
  let match = scope.term.match(/^define\s(.+)/);
  if (match) {
    cachedFetchWord(match[1]).then(items => {
      if (!items) {
        return;
      }
      const response = items.map(item => ({
        icon,
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,

        getPreview: () => <Preview word={ item } />,
      }));
      scope.display(response);
    })
  }
};

module.exports = {
  fn: plugin,
  icon,
  name: 'Define a word',
  keyword: 'define'
}
