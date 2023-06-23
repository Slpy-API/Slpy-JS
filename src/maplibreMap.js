//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { mapLibraries } from "./globals.js";
import { loadMaplibre } from './loadMaplibre.js';
import { processOptions, maplibreCheck, loadMaplibreMap } from './maplibreFunctions';

// MglMap function
export function maplibreMap(options) {
    mapLibraries.maplibregl = loadMaplibre();
    options = processOptions(options);
    if (maplibreCheck(options["container"], false)) {
        return loadMaplibreMap(options);
    } else {
        return "";
    }
}