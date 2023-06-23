//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { addressAutocomplete } from './src/addressAutocomplete.js';
import { addAerialImagery } from './src/aerialImagery.js';
import { addAutocomplete } from './src/autocomplete.js';
import { addMarkers, highlightMarker, dehighlightMarker, removeMarker, createMarker, setMarkerOpen, quickMarkersCenter } from './src/markers.js';
import { mapState, settings, openlayersParts, mapLibraries } from './src/globals.js';
import { addMapillary } from './src/streetLevel.js';
import { isWebGL2Supported, loadScript,setInteractionOnFocus, setTransform, flyTo, toRad, distanceInKM, distanceInMI } from './src/utils.js';

export default {
  addressAutocomplete,
  addAerialImagery,
  addAutocomplete,
  addMarkers,
  highlightMarker,
  dehighlightMarker,
  removeMarker,
  createMarker,
  setMarkerOpen,
  quickMarkersCenter,
  addMapillary,
  isWebGL2Supported,
  loadScript,
  setInteractionOnFocus,
  setTransform,
  flyTo,
  toRad,
  distanceInKM,
  distanceInMI,
  mapState,
  settings,
  openlayersParts,
  mapLibraries
};