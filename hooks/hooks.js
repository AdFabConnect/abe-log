'use strict';

var fs = require('fs');

/**
 * Use this API for simple, most common formatting.
 *
 * @param {Date}  date - Date object, which should be used.
 * @param {string} exp - String, which you want to format, for example: `{yyyy}-{MM}-{dd}` or Current time: `{hh}:{mm}:{ss}`.
 * @return {string} String with formatted date.
 *
 * @example
 * format(new Date(2014, 1, 11), '{yyyy}-{MM}-{dd}') //=> '2014-01-11'
 */
function format(date, exp) {
  return exp.replace(/\\?{.*?}/g, function(key) {
    if (key.startsWith('\\')) {
      return key.slice(1);
    }

    switch (key) {
      case '{yyyy}':
        return `${date.getFullYear()}`;
      case '{MM}':
        return `${(date.getMonth() + 1)}`.padStart(2, '0');
      case '{dd}':
        return `${date.getDate()}`.padStart(2, '0');
      case '{HH}':
        return `${date.getHours()}`.padStart(2, '0');
      case '{mm}':
        return `${date.getMinutes()}`.padStart(2, '0');
      case '{ss}':
        return `${date.getSeconds()}`.padStart(2, '0');
      default:
        return '';
    }
  });
}

var hooks = {
  afterDeleteFile: (path, json, abe) => {
    var d = new Date();

    try {
      fs.appendFileSync(
        `${abe.config.root}/delete-abe-${format(new Date(), '{yyyy}{MM}{dd}')}.txt`,
        `[${format(new Date(), '{yyyy}/{MM}/{dd}')} - ${format(new Date(), '{HH}:{mm}:{ss}')}] - Page removed: ${path}\r\n`
      );
    } catch(err) {
      console.log(err);
    }

    return path;
  },
};

exports.default = hooks;
