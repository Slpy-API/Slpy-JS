<img src="https://www.slpy.com/img/slpy-logo.svg" align="left" width="35px" height="70px">

# Slpy JS

Slpy JS enables easy integration and setup of interactive slippy maps, geocoding search, autocomplete and autofill, satellite to street level imagery, and other complex location features.  Powered by the [Slpy API](https://www.slpy.com), and designed for your JavaScript compatible applications and websites.

Visit the [Slpy Documentation](https://www.slpy.com/docs) site for more information on usage and features.

[![Version](https://img.shields.io/npm/v/slpy?style=flat)](https://www.npmjs.com/package/slpy) [![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

## Features

- 🗺️ Quick start for MapLibre and OpenLayers
- 🎨 Customizable map design
- 🖱️  Autofill addresss fields
- 📍  Autocomplete dropdown and search box
- 💻 Polyfill support for IE9+

## Getting Started

#### Create an Account
1. Create an account on the [Slpy Sign Up](https://www.slpy.com/users/join) page and generate an API Key on your account page.

#### Install Dependencies
2. If you are using Slpy JS for displaying an interactive map, install either [Maplibre GL JS](https://github.com/maplibre/maplibre-gl-js) - OR - [OpenLayers](https://github.com/openlayers/openlayers) with [OL-Mapbox-Style](https://github.com/openlayers/ol-mapbox-style).

```bash
npm install --save-dev maplibre-gl ol ol-mapbox-style
```
Or Slpy hosted scripts are available at
```html
<!-- Maplibre GL JS -->
<script src="https://api.slpy.com/lib/mlgl/latest/maplibre-gl.js"></script>
```
```html
<!-- OpenLayers and OL Mapbox Style -->
<script src="https://api.slpy.com/lib/ol/latest/ol.js"></script>
<script src="https://api.slpy.com/lib/olms/latest/olms.js"></script>
``` 
## Installation

1. You can include Slpy JS in your project through npm:

```bash
npm install slpy
```

Or using yarn:

```bash
yarn add slpy
```

Or a Slpy hosted script is available
```html
<script src="https://api.slpy.com/lib/slpy/latest/slpy.js"></script>
```

2. Include or import the Slpy CSS file
```javascript
import 'slpy/dist/css/slpy-style.css'
```
For Maplibre GL JS
```javascript
import 'maplibre-gl/dist/maplibre-gl.css'
```
For OpenLayers
```javascript
import 'ol/ol.css'
```

## Basic MapLibre Map (Module)

Once MapLibre is installed as a dependency or included as a script, use `maplibreMap` to load.  Maplibre will be imported automatically.
```javascript
import { slpy } from 'slpy';

const map = new slpy.maplibreMap({
  apiKey: 'your_api_key',  // your API Key from www.slpy.com
  target: 'map', // id of the HTML element to render the map
  center: [0, 0], // longitude and latitude of the center
  zoom: 3 // initial zoom level
});
```

## Basic OpenLayers Map (Module)

Once OpenLayers and OL-Mapbox-Style are installed or included as a script, use `openlayersMap` to load.  Dependencies will be imported automatically.
```javascript
import { slpy } from 'slpy/dist/index.openlayers.js';

const map = new slpy.openlayersMap({
  apiKey: 'your_api_key',  // your API Key from www.slpy.com
  target: 'map', // id of the HTML element to render the map
  center: [0, 0], // longitude and latitude of the center
  zoom: 3 // initial zoom level
});
```
## Basic Map JS (HTML)

```html
<script src="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js"></script>
<link href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css" rel="stylesheet" />

<script src="https://api.slpy.com/lib/slpy/latest/slpy.js"></script>
<link href="https://api.slpy.com/lib/slpy/latest/slpy-style.css" rel="stylesheet">

<div id="map" style="width:100%; height:400px;"></div>
<script>
const map = new slpy.maplibreMap({
  apiKey: 'your_api_key',  // your API Key from www.slpy.com
  target: 'map', // id of the HTML element to render the map
  center: [0, 0], // longitude and latitude of the center
  zoom: 3 // initial zoom level
});
</script>
```

## Basic Address Autocomplete

```html
<form id="form-element-id">
	<input name="ra" autocomplete="section-residential shipping address-line1">
</form>

<script>
slpy.addressAutocomplete( 'form-element-id', {
  apiKey: 'your-api-key',
  country: 'US',
} );
</script>
```

## Documentation

For detailed usage and API documentation, please visit the [Slpy Documentation](https://www.slpy.com/docs).

## Examples

- [Map Examples and Customization](https://www.slpy.com/docs/map-customization) style and add features to your Slpy maps.

- [Search and Autocomplete Examples](https://www.slpy.com/docs/search-examples) create dynamic address forms and location search.

## Browser Support

Slpy JS is compatible with all modern web browsers. For Internet Explorer, partial support is available through a polyfilled version at "/dist/slpy.polyfilled.js" in combination with OpenLayers for raster maps.  More information is a available on the [Slpy Browser Compatibility](https://www.slpy.com/docs/browser-compatibility) page.

## Contributing

We welcome contributions from the community. If you're interested in contributing, please see [our contributing guidelines](https://github.com/Slpy-API/Slpy-JS/CONTRIBUTING.md).
