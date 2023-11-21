//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { isWebGL2Supported } from "./utils.js";
import { mapState, settings, mapLibraries } from "./globals.js";

export function processOptions(options) {
    if (!options["apiKey"]) {
        console.log("Slpy Map Missing apiKey: Please add your Slpy apiKey to the options object in the maplibreMap function.");
    }
    if (!options["container"]) {
        console.log("Slpy Map Missing container: Please add your container id or element to the options object in the maplibreMap function.");
    }
    if (!options["center"]) {
        console.log("Slpy Map Missing center: Please add your center as a [longitude, latitude] element to the options object in the maplibreMap function.");
    }
    if (!options["zoom"]) {
        console.log("Slpy Map Missing zoom: Please add a zoom value to the options object in the maplibreMap function. Level 0 is globe, 20 is house level.");
    }
    if (typeof options["mapType"] !== "undefined" && options["mapType"].toLowerCase() == "raster") {
        options["mapType"] = "raster";
    } else {
        options["mapType"] = "vector";
    }
    if (typeof options["language"] !== "undefined" && options["language"].toLowerCase() != "en") {
        options["mapLanguage"] = options["language"].toLowerCase();
    } else if (typeof options["mapLanguage"] !== "undefined" && options["mapLanguage"].toLowerCase() != "en") {
        options["mapLanguage"] = options["mapLanguage"].toLowerCase();
    } else {
        options["mapLanguage"] = "en";
    }
    if (typeof options["mapFilter"] !== "undefined" && options["mapFilter"].length > 0 ) {
        settings.mapFilter = options["mapFilter"];
    }
    settings.apiKey = options["apiKey"].toLowerCase();
    return options;
}

export function maplibreCheck(targetDivId, openlayersFallback) {

    if (typeof mapLibraries.maplibregl === "undefined" || !isWebGL2Supported()) {

        if (openlayersFallback == false) {
            var mapDivEl = targetDivId
            if (typeof mapDivEl === "string") {
                var mapDivEl = document.getElementById(targetDivId);
            }
            if (typeof mapLibraries.maplibregl === "undefined") {
                mapDivEl.insertAdjacentHTML(
                    "afterbegin",
                    '<p id="mapOverlayNotice">The Maplibre GL library could not be found or imported.</p>'
                );
            } else {
                mapDivEl.insertAdjacentHTML(
                    "afterbegin",
                    '<p id="mapOverlayNotice">Your Web Browser is not compatible.  Please upgrade.</p>'
                );
            }
        }
        return false;
    }
    return true;
}

export function loadMaplibreMap(options) {

    mapState.maplibreLoaded = true;
    if (typeof MglOptions !== "undefined") {
        options = Object.assign(options, MglOptions);
    }
    var antialias = false;
    mapState.mapStyleUrl = process.env.API_URL + ".slpy.com/style/slpy-mgl-style.json?key=" + settings.apiKey;
    var navControlLocation = "top-left";

    // If the mapType is "raster", set antialias to false and add "&raster=true" to the map style URL
    // If the mapStyle is "3d", set antialias to true and add "&style=3d" to the map style URL
    if (options["mapType"] == "raster") {
        antialias = false;
        mapState.mapStyleUrl += "&raster=true";
    } else if (options["mapStyle"]) {
        if (options["mapStyle"].toLowerCase() == "3d") {
            antialias = true;
            mapState.mapStyleUrl += "&style=3d";
        }
    }
    //allow overwrite of antialias
    if (typeof options["antialias"] !== "undefined") {
        antialias = options["antialias"];
    }
    //allow overwrite of maxZoom
    var maxzoom = 21;
    if (typeof options["maxZoom"] !== "undefined") {
        maxzoom = options["maxZoom"];
    }
    if (typeof options["mapTransform"] !== "undefined" && options["mapTransform"].length > 0) {
        mapState.mapStyleUrl += "&transform=" + options["mapTransform"].toLowerCase();
    }

    // If a map filter is defined, add it to the map style URL
    if (typeof settings.mapFilter !== "undefined" && settings.mapFilter.length > 0) {
        mapState.mapStyleUrl += "&filter=";

        // Build the map filter string by concatenating the individual filter terms		if (typeof mapFilter !== "undefined" && mapFilter.length > 0) {
        mapState.mapStyleUrl += "&filter=";
        for (var i = 0; i < settings.mapFilter.length; i++) {
            mapState.mapStyleUrl += settings.mapFilter[i].toLowerCase().replace("_points", "") + ",";
        }
        mapState.mapStyleUrl = mapState.mapStyleUrl.substring(0, mapState.mapStyleUrl.length - 1);
    }
    if (options["mapLanguage"] != "en") {
        mapState.mapStyleUrl += "&lang=" + options["mapLanguage"];
    }
    var defaultGlOptions = {
        container: options['container'],
        style: mapState.mapStyleUrl,
        maxZoom: maxzoom,
        // style URL
        center: options["center"],
        zoom: options["zoom"],
        antialias: antialias,
        hash: false,
        attributionControl: false
    };
    if (options !== "") {
        for (var attrname in options) {
            defaultGlOptions[attrname] = options[attrname];
        }
    }
    if (typeof options["navControl"] !== "undefined" && options["navControl"].toLowerCase() == "none") {
        return new mapLibraries.maplibregl.Map(defaultGlOptions).addControl(
            new mapLibraries.maplibregl.AttributionControl({
                compact: false
            })
        );
    } else {
        if (options["navControl"]) {
            navControlLocation = options["navControl"];
        }
        return new mapLibraries.maplibregl.Map(defaultGlOptions)
            .addControl(
                new mapLibraries.maplibregl.AttributionControl({
                    compact: false
                })
            )
            .addControl(new mapLibraries.maplibregl.NavigationControl(), navControlLocation);
    }

}
