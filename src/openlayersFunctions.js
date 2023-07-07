//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { isVectorSupported } from './utils.js';
import { settings, openlayersParts, mapState, mapLibraries } from './globals.js';
import { loadOpenLayers } from './loadOL.js'
import { loadOLMS } from './loadOLMS.js';

export function openlayersMap(options) {
    mapLibraries.ol = loadOpenLayers();

    if (!options["controls"]) {
        var olDefaults = {
            rotate: true,
            rotateOptions: {
                autoHide: false
            },
            zoom: true,
            zoomOptions: {
                zoomDuration: 500
            },
            attribution: true,
            attributionOptions: {
                collapsible: false
            }
        };

        // Check if the "defaults" function exists for map controls.
        if (typeof mapLibraries.ol.control.defaults == "function") {
            options["controls"] = mapLibraries.ol.control.defaults(olDefaults);
        } else {
            options["controls"] = mapLibraries.ol.control.defaults.defaults(olDefaults);
        }
    }
    openlayersParts.controls = options["controls"];
    if (!options["interactions"]) {
        // Check if the "defaults" function exists for map interactions.
        if (typeof mapLibraries.ol.interaction.defaults == "function") {
            options["interactions"] = mapLibraries.ol.interaction.defaults({
                pinchRotate: false
            });
        } else {
            options["interactions"] = mapLibraries.ol.interaction.defaults.defaults({
                pinchRotate: false
            });
        }
    }
    openlayersParts.interactions = options["interactions"];
    var mapType = "vector";
    if (typeof options["mapType"] !== "undefined" && options["mapType"] == "raster") {
        mapType = "raster";
    }
    if (!options["apiKey"]) {
        console.log("Slpy Map Missing apiKey: Please add your Slpy apiKey to the options object in the olMap function.");
    }
    if (!options["target"] && !options["container"]) {
        console.log("Slpy Map Missing target: Please add your target id or element to the options object in the olMap function.");
    } else if (options["container"]) {
        options["target"] = options["container"];
    }
    if (!options["center"]) {
        console.log("Slpy Map Missing center: Please add your center as a [longitude, latitude] element to the options object in the olMap function.");
    }
    if (!options["zoom"]) {
        console.log("Slpy Map Missing zoom: Please add a zoom value to the options object in the olMap function. Level 0 is globe, 20 is house level.");
    }
    if (!options["view"]) {
        // Check if the "defaults" function exists for map interactions.
        options["view"] = getView(options["center"], options["zoom"]);
    }
    if (typeof options["mapLanguage"] !== "undefined" && options["mapLanguage"].toLowerCase() != "en") {
        options["mapLanguage"] = options["mapLanguage"].toLowerCase();
    } else {
        options["mapLanguage"] = "en";
    }
    openlayersParts.view = options["view"];
    settings.apiKey = options["apiKey"];
    if (mapType == "raster") {
        mapState.openlayersLoaded = true;
        return new mapLibraries.ol.Map({
            controls: openlayersParts.controls,
            interactions: openlayersParts.interactions,
            layers: [getLayer(mapType, settings.apiKey, options)],
            target: options["target"],
            view: openlayersParts.view
        });
    } else {
        var map = new mapLibraries.ol.Map({
            controls: openlayersParts.controls,
            interactions: openlayersParts.interactions,
            target: options["target"],
            view: openlayersParts.view
        });
        mapLibraries.olms = loadOLMS();
        if (typeof mapLibraries.olms !== "undefined") {
            mapLibraries.olms.apply(map, process.env.API_URL + ".slpy.com/style/slpy-mgl-style.json?key=" + settings.apiKey);
        }
        mapState.openlayersLoaded = true;
        return map;
    }

}

export function getView(center, startZoom) {
    return new mapLibraries.ol.View({
        center: mapLibraries.ol.proj.fromLonLat(center),
        zoom: startZoom,
        maxZoom: 21
    });
}

//create Layer function
export function getLayer(type, apiKey, options) {
    var myNav = navigator.userAgent.toLowerCase();

    //check for IE Raster fallback
    var showRaster = false;
    if (settings.rasterFallback && type != "raster") {
        if (!isVectorSupported()) {
            showRaster = true;
            mapState.oldIE = true;
        }
    } else if (type == "raster") {
        if (!isVectorSupported()) {
            mapState.oldIE = true;
        }
    }
    var requiredAttribution =
        '©&nbsp;<a href="https://www.slpy.com">Slpy</a> ©&nbsp;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>&nbsp;contributors';
    if (showRaster || type == "raster") {
        //raster layer
        var tilePixelRatioS = 2;
        if (mapState.oldIE) {
            if (parseInt(myNav.split("msie")[1]) <= 9) {
                tilePixelRatioS = 1;
            }
        }
        return new mapLibraries.ol.layer.Tile({
            source: new mapLibraries.ol.source.XYZ({
                maxZoom: 19,
                tileSize: 256,
                tilePixelRatio: tilePixelRatioS,
                attributions: requiredAttribution,
                url:
                    "https://api.slpy.com/v1/raster/" +
                    options["mapLanguage"] +
                    "/{z}/{x}/{y}.png?key=" +
                    apiKey
            })
        });
    } else {
        //vector layer
        return new mapLibraries.ol.layer.VectorTile({
            declutter: true,
            source: new mapLibraries.ol.source.VectorTile({
                maxZoom: 15,
                renderMode: "hybrid",
                format: new mapLibraries.ol.format.MVT(),
                url:
                    "https://api.slpy.com/v1/vector/" +
                    options["mapLanguage"] +
                    "/{z}/{x}/{y}.pbf?key=" +
                    apiKey
            }),
            zIndex: 0
        });
    }
}