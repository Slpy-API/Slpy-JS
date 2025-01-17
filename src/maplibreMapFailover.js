//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { loadScript, isVectorSupported } from "./utils.js";
import { waitForOl } from "./OLfallback.js";
import { settings, mapLibraries, mapState } from "./globals.js";
import { loadMaplibre } from './loadMaplibre.js';
import { processOptions, maplibreCheck, loadMaplibreMap } from './maplibreFunctions';

// MglMap function
//exclusively for use with the slpy.polyfill.js library and made to failover to a build of openlayers compiled for older browsers.
export function maplibreMap(options) {
    mapLibraries.maplibregl = loadMaplibre();
    options = processOptions(options);
    if (maplibreCheck(options["container"], settings.openlayersFallback)) {
        return loadMaplibreMap(options);
    } else {
        if (settings.openlayersFallback) {
            // Find the Maplibre-gl script on the page
            var scriptList = document.querySelectorAll("script");
            var convertedNodeList = Array.prototype.slice.call(scriptList);
            var mglscript;

            for (var i = 0; i < convertedNodeList.length; i++) {
                if (convertedNodeList[i].src.indexOf("maplibre-gl") !== -1 && convertedNodeList[i].type === "text/javascript") {
                    mglscript = convertedNodeList[i];
                    break;
                }
            }
            if (mglscript !== undefined) {
                mglscript.parentNode.removeChild(mglscript);
            }
            if (options["mapType"] != "raster") {
                //lets check if we can run vector tiles by testing for certain features.
                //cross site xml request is an example of currently breaking feature in ie9
                if (!isVectorSupported()) {
                    if (settings.rasterFallback) {
                        options["mapType"] = "raster";
                    } else {
                        var mapDivEl = options["container"];
                        if (typeof mapDivEl === "string") {
                            mapDivEl = document.getElementById(options["container"]);
                        }
                        mapDivEl.insertAdjacentHTML(
                            "afterbegin",
                            '<p id="mapOverlayNotice">Your Web Browser is not compatible.  Please upgrade.</p>'
                        );
                        return "";
                    }
                } else if (settings.rasterFallback) {
                    options["mapType"] = "raster";
                }
            }
            loadScript(process.env.API_URL + ".slpy.com/lib/ol/latest/ol.legacy.min.js");
            waitForOl(options);
            mapState.openlayersLoading = true;
            return {};
        }
        return "";
    }
}