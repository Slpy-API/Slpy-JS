//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { mapState } from './globals.js';
import { openlayersMap } from './openlayersFunctions.js';
import { addAerialImagery } from './aerialImagery.js';

export function waitForOl(options) {
    if (typeof window.ol === "undefined") {
        setTimeout(waitForOl, 250, options);
    } else {
        var olcss = document.createElement("link");
        var facss = document.createElement("link");
        olcss.href = process.env.API_URL + ".slpy.com/lib/ol/latest/ol.css";
        facss.href = process.env.API_URL + ".slpy.com/lib/font-awesome/latest/css/all.min.css";
        olcss.rel = "stylesheet";
        facss.rel = "stylesheet";
        document.head.appendChild(olcss);
        document.head.appendChild(facss);
        options["mapType"] = "raster";
        var map = openlayersMap(options);
        if (typeof mapState.openlayersReady !== "undefined") {
            mapState.openlayersReady(map);
        }
        if (typeof mapState.aerialImageryOn !== "undefined") {
            addAerialImagery(map);
        }
    }
}
