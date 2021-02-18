'use strict';

var fs = require('fs');
var format = require('light-date').format;

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
