var zip = require('./zip');
var saveAs = require('file-saver').saveAs;

module.exports = function(gj, options) {
  zip(gj, options).then(function(blob) {
    try {
      var isFileSaverSupported = !!new Blob;
    } catch (e) {
      console.error('Saving files is not supported', e);
    }
    saveAs(blob, options.file + '.zip'); });
};
