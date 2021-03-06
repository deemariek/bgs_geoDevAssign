# OpenCage Data Geocoding Control for Leaflet

A [Leaflet](http://leafletjs.com/) search control that uses OpenCage Data's [geocoder](http://geocoder.opencagedata.com/).

Check out a demo page in `/demo`. Or take a look at the live [demo](http://opencagedata.github.io/leaflet-opencage-search/).


## Installation

You have three options

* Clone from GitHub: `git@github.com:opencagedata/leaflet-opencage-search.git`

or

* Download a [zip or tarball archive](https://github.com/opencagedata/leaflet-opencage-search/releases)

or

* Install with Bower: `$ bower install Leaflet.OpenCage.Search`


## Configuration

The control uses two image files that it expects to find in a directory with
a path relative to the control's CSS files as `../images`. If you've installed
the control using Bower you'll find these in `bower_components/Leaflet.OpenCage.Search/dist/images/`. If you've
cloned the control's GitHub repository or downloaded and unpacked an archive
from GitHub, you'll find these in 'dist/images'.

Whichever installation method you've chosen, you'll need to move a copy of these
two image files to a directory relative to the location of the control's CSS files.

## Usage

Load the plugin's CSS and JavaScript files:

```HTML
<link rel="stylesheet" href="http://rawgit.com/opencagedata/leaflet-opencage-search/master/dist/css/L.Control.OpenCageSearch.dev.css" />
<script src="http://rawgit.com/opencagedata/leaflet-opencage-search/master/dist/js/L.Control.OpenCageSearch.dev.js"></script>
```

Add the plugin's control to an `L.Map` instance:

```javascript
var map = L.map('map').setView([51.52255, -0.10249], 13);
var options = {
	key: 'your-api-key-here',
	limit: 10
};
var control = L.Control.openCageSearch(options).addTo(map);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

```

## Customizing

By default, when a geocoding result is found, the control will center the map on it and place a marker
at its location. This can be customized by overwriting the control's markGeocode function, to perform
any action desired.

For example:

```javascript
var control = L.Control.openCageSearch(options).addTo(map);

control.markGeocode = function(result) {
    var bbox = result.bbox;
    L.polygon([
         bbox.getSouthEast(),
         bbox.getNorthEast(),
         bbox.getNorthWest(),
         bbox.getSouthWest()
    ]).addTo(map);
};
```

This will add a polygon representing the result's boundingbox when a result is selected.



## Contributing

See `CONTRIBUTING.md` file.

## Dependencies

Leaflet version 0.7+

## License

See `LICENSE` file.