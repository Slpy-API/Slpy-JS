//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { mapState, mapLibraries } from './globals.js'

export function isEmptyObj(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

export function isWebGL2Supported() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGL2RenderingContext && (canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2')));
    } catch (e) {
        return false;
    }
}

export function isWebGL1Supported() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

export function isVectorSupported() {
    function isCanvasSupported() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    // Check if browser can create sufficient number of Canvas contexts (limited in some browsers)
    function checkCanvasContextLimit() {
        var canvasLimit = 16; // Arbitrary reasonable number
        var canvasArray = [];
        for (var i = 0; i < canvasLimit; i++) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            if (!context) {
                console.log("Browser has limited Canvas contexts.");
                return false; // Browser hit limit
            }
            canvasArray.push(canvas); // Retain reference to prevent GC cleaning up canvases
        }
        return true; // All canvas contexts could be created
    }

    // Check if fetch and Promise APIs are supported
    function isFetchAndPromiseSupported() {
        return 'fetch' in window && 'Promise' in window;
    }

    // Check if CORS is supported
    function isCORSSupported() {
        return 'withCredentials' in new XMLHttpRequest();
    }

    // Ensure necessary features are available
    return isCanvasSupported() && checkCanvasContextLimit() && isFetchAndPromiseSupported() && isCORSSupported();
}

export function loadScript(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);
}

export function getJSON(url, success) {
    var ud = "_" + +new Date(),
        script = document.createElement("script"),
        head = document.getElementsByTagName("head")[0] || document.documentElement;
    window[ud] = function (data) {
        head.removeChild(script);
        success && success(data);
    };
    script.src = url.replace("callback=?", "callback=" + ud);
    head.appendChild(script);
}

export function setInteractionOnFocus(div, mapob) {
    var mapDivEl = document.getElementById(div);
    mapDivEl.style.position = "relative";
    mapDivEl.tabIndex = 1;
    mapDivEl.insertAdjacentHTML(
        "afterbegin",
        '<p id="mapOverlayNotice" style="position:absolute;z-index:10;margin-top:20px;width:100%;height:100%;font-weight:bold;font-size:22px;color:black;display:none;text-align:center;justify-content: center; align-items: center;"><span style="background:white;padding: 10px;border-radius: 10px;box-shadow: 2px 2px 4px #555;">Click the map to pan and zoom.</span></p>'
    );
    var mapDivNotice = document.getElementById("mapOverlayNotice");
    if (typeof mapLibraries.ol !== "undefined") {
        if (mapState.openlayersLoaded) {
            mapob.getInteractions().forEach(function (interaction) {
                if (interaction instanceof mapLibraries.ol.interaction.DragPan || interaction instanceof mapLibraries.ol.interaction.MouseWheelZoom) {
                    interaction.setActive(false);
                }
            }, this);
        }
        mapDivEl.onclick = function () {
            mapDivEl.removeEventListener("wheel", handleMapTouch, false);
            mapDivEl.removeEventListener("touchmove", handleMapTouch, false);
            if (mapState.openlayersLoaded) {
                mapob.getInteractions().forEach(function (interaction) {
                    if (interaction instanceof mapLibraries.ol.interaction.DragPan || interaction instanceof mapLibraries.ol.interaction.MouseWheelZoom) {
                        interaction.setActive(true);
                    }
                }, this);
            }
        };
    } else {
        if (mapState.maplibreLoaded) {
            mapob["scrollZoom"].disable();
            mapob["dragPan"].disable();
        }
        mapDivEl.onclick = function () {
            mapDivEl.removeEventListener("wheel", handleMapTouch, false);
            mapDivEl.removeEventListener("touchmove", handleMapTouch, false);
            if (mapState.maplibreLoaded) {
                mapob["scrollZoom"].enable();
                mapob["dragPan"].enable();
            }
        };
    }
    var timer = null;
    var handleMapTouch = function handleMapTouch(event) {
        if (document.activeElement !== mapDivEl) {
            mapDivEl.style.opacity = "0.7";
            mapDivNotice.style.display = "flex";
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                mapDivNotice.style.display = "none";
                mapDivEl.style.opacity = "1";
            }, 500);
        }
    };
    mapDivEl.addEventListener("wheel", handleMapTouch, false);
    mapDivEl.addEventListener("touchmove", handleMapTouch, false);
}

export function setTransform(transform, map) {
    //mgl only
    if (typeof map === "undefined") {
        console.log("Map was undefined.  The second parameter should be of type Map.");
        return;
    }
    if (typeof mapLibraries.ol === "undefined") {
        if (typeof mapState.mapStyleUrl !== "undefined") {
            var urlParts = mapState.mapStyleUrl.split("?");
            var baseUrl = urlParts[0];
            var queryString = urlParts[1];
            var params = queryString.split("&");
            var newParams = [];
            for (var i = 0; i < params.length; i++) {
                if (params[i].indexOf("transform=") === -1) {
                    newParams.push(params[i]);
                }
            }
            mapState.mapStyleUrl = baseUrl + "?" + newParams.join("&");
            if (transform != "" && transform != "default") {
                mapState.mapStyleUrl = mapState.mapStyleUrl + "&transform=" + transform;
            }
            map.setStyle(mapState.mapStyleUrl);
        } else {
            console.log("Could not retrieve original url. mapStyleUrl is undefined.");
        }
    } else {
        console.log("Can not currently set Transform with OpenLayers.  Requires MapLibre.");
    }
}

export function flyTo(obj, map) {
    if (typeof mapLibraries.ol !== "undefined") {
        var view = map.getView();
        var startPoint = mapLibraries.ol.proj.toLonLat(view.getCenter());
        var destination = mapLibraries.ol.proj.fromLonLat([obj.lon, obj.lat]);
        var zoom = view.getZoom();
        var quality = obj.quality;
        var done = function done() { };
        var parts = 2;
        var called = false;
    } else {
        var quality = obj.quality;
        var getcenter = map.getCenter();
        var startPoint = Object.values(getcenter);
        var destination = [obj.lon, obj.lat];
        var zoom = map.getZoom();
    }
    var distance = distanceInKM(obj.lat, obj.lon, startPoint[1], startPoint[0]);
    var duration = 5000;
    var topZoom = zoom - 1;
    switch (true) {
        case distance < 1:
            if (zoom > 16) {
                topZoom = 16;
            }
            duration = 1000;
            break;
        case distance < 5:
            if (zoom > 15) {
                topZoom = 15;
            }
            duration = 1000;
            break;
        case distance < 10:
            if (zoom > 14) {
                topZoom = 14;
            }
            duration = 1000;
            break;
        case distance < 40:
            if (zoom > 13) {
                topZoom = 13;
            }
            duration = 1000;
            break;
        case distance < 50:
            if (zoom > 12) {
                topZoom = 12;
            }
            duration = 2000;
            break;
        case distance < 150:
            if (zoom > 11) {
                topZoom = 11;
            }
            duration = 2000;
            break;
        case distance < 250:
            if (zoom > 10) {
                topZoom = 10;
            }
            duration = 2000;
            break;
        case distance < 400:
            if (zoom > 9) {
                topZoom = 9;
            }
            duration = 3000;
            break;
        case distance < 700:
            if (zoom > 8) {
                topZoom = 8;
            }
            duration = 3000;
            break;
        case distance < 1000:
            if (zoom > 7) {
                topZoom = 7;
            }
            duration = 3000;
            break;
        case distance < 2000:
            if (zoom > 6) {
                topZoom = 6;
            }
            duration = 4000;
            break;
        case distance < 3500:
            if (zoom > 5) {
                topZoom = 5;
            }
            duration = 4000;
            break;
        case distance < 5000:
            if (zoom > 4) {
                topZoom = 4;
            }
            duration = 4000;
            break;
        case distance >= 5000:
            if (zoom > 3) {
                topZoom = 3;
            }
            duration = 4000;
            break;
        default:
            break;
    }
    if (zoom < 13) {
        zoom = 13;
    }
    switch (parseInt(quality)) {
        case 1:
            zoom = 4;
            break;
        case 2:
            zoom = 6;
            break;
        case 3:
            zoom = 8;
            break;
        case 4:
            zoom = 10;
            break;
        case 5:
            zoom = 12;
            break;
        case 6:
            zoom = 13;
            break;
        case 7:
            zoom = 14;
            break;
        case 8:
            zoom = 16.5;
            break;
        case 9:
            zoom = 17;
            break;
        case 10:
            zoom = 17;
            break;
        default:
            break;
    }
    if (topZoom >= zoom) {
        topZoom = zoom - 1;
    }
    if (typeof mapLibraries.ol !== "undefined") {
        var callback = function callback(complete) {
            --parts;
            if (called) {
                return;
            }
            if (parts === 0 || !complete) {
                called = true;
                done(complete);
            }
        };
        view.animate(
            {
                center: destination,
                duration: duration
            },
            callback
        );
        view.animate(
            {
                zoom: topZoom,
                duration: duration
            },
            {
                zoom: zoom,
                duration: duration / 2
            },
            callback
        );
    } else {
        map.flyTo({
            center: destination,
            minZoom: topZoom,
            zoom: zoom,
            maxDuration: duration * 2.5
        });
    }
}

export function toRad(x) {
    return (x * Math.PI) / 180;
}

export function distanceInKM(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLon = toRad(lon2 - lon1),
        lat1 = toRad(lat1),
        lat2 = toRad(lat2),
        d =
            Math.acos(
                Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)
            ) * R;
    return d;
}

export function distanceInMI(lat1, lon1, lat2, lon2) {
    var R = 3959; // miles
    var dLon = toRad(lon2 - lon1),
        lat1 = toRad(lat1),
        lat2 = toRad(lat2),
        d =
            Math.acos(
                Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)
            ) * R;
    return d;
}