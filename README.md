# shp-write

[![Build Status](https://secure.travis-ci.org/mapbox/shp-write.svg?branch=master)](http://travis-ci.org/mapbox/shp-write)

Writes shapefile in pure javascript. Uses [dbf](https://github.com/tmcw/dbf)
for the data component, and [jsZIP](http://stuk.github.io/jszip/) to generate
ZIP file downloads in-browser.

## Usage

For node.js or [browserify](https://github.com/substack/node-browserify)

    npm install --save shp-write

Or in a browser

    https://unpkg.com/shp-write@latest/shpwrite.js

## Testing

To test the download functionality run `npm run make-test` and open index.html in browser.
This should start an immediate download of test features defined in `indexTest.js`.

## Caveats

* Requires a capable fancy modern browser with [Typed Arrays](http://caniuse.com/#feat=typedarrays)
  support
* Geometries: Point, PointZ, MultiPoint, MultiPointZ, LineString, LineStringZ, Polygon, PolygonZ, MultiLineString, MultiPolygon
* Tabular-style properties export with Shapefile's field name length limit

## Example

```js
var shpwrite = require('shp-write');

// (optional) set names for zip file, zipped folder and feature types
var options = {
    folder: 'myshapes',
    types: {
        point: 'mypoints',
        polygon: 'mypolygons',
        polyline: 'mylines'
    }
}
// a GeoJSON bridge for features
shpwrite.download({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 0]
            },
            properties: {
                name: 'Foo'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [0, 10]
            },
            properties: {
                name: 'Bar'
            }
        }
    ]
}, options);
// triggers a download of a zip file with shapefiles contained within.
```

## API

### `download(geojson)`

Given a [GeoJSON](http://geojson.org/) FeatureCollection as an object,
converts convertible features into Shapefiles and triggers a download.

### `write(data, geometrytype, geometries, callback)`

Given data, an array of objects for each row of data, geometry, the OGC standard
geometry type (like `POINT`), geometries, a list of geometries as bare coordinate
arrays, generate a shapfile and call the callback with `err` and an object with

```js
{
    shp: DataView(),
    shx: DataView(),
    dbf: DataView()
}
```

### `zip(geojson)`

Generate a ArrayBuffer of a zipped shapefile, dbf, and prj, from a GeoJSON
object.

## Other Implementations

* [https://code.google.com/p/pyshp/](https://code.google.com/p/pyshp/)

## Reference

* [http://www.esri.com/library/whitepapers/pdfs/shapefile.pdf](http://www.esri.com/library/whitepapers/pdfs/shapefile.pdf)

## Contributors

* Nick Baugh <niftylettuce@gmail.com>

## Pull requests contained in this branch

This branch includes the following PRs of the official repository:

* [IE download fix](https://github.com/mapbox/shp-write/pull/50) (merged manually as the source repo is gone)
* [Fix point export](https://github.com/mapbox/shp-write/pull/69)
* [Fixed extraction of polygon coordinates](https://github.com/mapbox/shp-write/pull/65)
