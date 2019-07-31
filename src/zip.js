var write = require('./write');
var geojson = require('./geojson');
var prj = require('./prj');
var JSZip = require('jszip');

module.exports = function(gj, options) {
  var zip = new JSZip(),layers;
  // if options.folder is set to false, zip files without a folder
  if (options && options.folder === false) {
    layers = zip;
  } else {
    layers = zip.folder(options && options.folder ? options.folder : 'layers');
  }

  [geojson.point(gj), geojson.line(gj), geojson.polygon(gj)]
    .forEach(function(l) {
      if (l.geometries.length && l.geometries[0].length) {
        write(
          // field definitions
          l.properties,
          // geometry type
          l.type,
          // geometries
          l.geometries,
          function(err, files) {
            var fileName = options && options.types[l.type.toLowerCase()] ? options.types[l.type.toLowerCase()] : l.type;
            layers.file(fileName + '.shp', files.shp.buffer, { binary: true });
            layers.file(fileName + '.shx', files.shx.buffer, { binary: true });
            layers.file(fileName + '.dbf', files.dbf.buffer, { binary: true });
            layers.file(fileName + '.prj', prj);
          });
      }
    });

  return zip.generateAsync({
    type: process.browser === undefined ? 'nodebuffer' : 'blob',
    compression: 'DEFLATE'
  });
};
