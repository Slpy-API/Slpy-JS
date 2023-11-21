//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { mapState, settings, mapLibraries } from "./globals.js";

export function addAerialImagery(map) {
    var aerialImageryLoad = true;
    var AIbbox = [
        [
            [-104.853516, 29.774649],
            [-80.90332, 41.808621]
        ],
        // s_c
        [
            [-114.697266, 31.733423],
            [-106.54541, 49.09563]
        ],
        // w_c
        [
            [-125.727539, 32.407206],
            [-114.609375, 49.125338]
        ],
        // w
        [
            [-108.149414, 31.735093],
            [-104.633789, 49.152471]
        ],
        // c
        [
            [-81.101074, 31.864267],
            [-69.675293, 42.359457]
        ],
        // e
        [
            [-83.693848, 24.493357],
            [-79.848633, 30.395503]
        ],
        // fl
        [
            [-101.645508, 28.849233],
            [-84.528809, 29.749476]
        ],
        // tx_l
        [
            [-100.623779, 25.743899],
            [-95.339355, 28.827531]
        ],
        // tx_s
        [
            [-106.479492, 30.340827],
            [-104.699707, 32.162079]
        ],
        // tx_w
        [
            [-112.543945, 31.25324],
            [-108.105469, 31.964051]
        ],
        // az
        [
            [-104.897461, 41.758319],
            [-82.375488, 46.029057]
        ],
        // io
        [
            [-104.919434, 45.943561],
            [-83.210449, 47.548488]
        ],
        // mi
        [
            [-104.941406, 47.48012],
            [-88.088379, 48.298688]
        ],
        // nd
        [
            [-104.952393, 48.277197],
            [-92.362061, 49.418971]
        ],
        // ca_s
        [
            [-79.969482, 42.295311],
            [-69.829102, 43.573655]
        ],
        // ny
        [
            [-76.640625, 43.53305],
            [-66.52771, 45.077231]
        ],
        // vt
        [
            [-71.5979, 45.03054],
            [-66.994629, 47.493728]
        ],
        // mn
        [
            [-160.532227, 18.773407],
            [-154.423828, 22.493078]
        ],
        // ha
        [
            [-67.985919, 17.265936],
            [-64.52648, 18.884333]
        ],
        // pr
        [
            [-168.354492, 52.855864],
            [-140.800781, 71.441149]
        ],
        // ak
        [
            [-142.03125, 54.626423],
            [-129.726563, 60.533801]
        ]
    ]; // ak_s
    if (typeof mapLibraries.ol !== "undefined") {
        var isInAerialArea = function isInAerialArea() {
            var curmapaiz = map.getView().getZoom();
            if (curmapaiz < 8.5) {
                return true;
            } else if (curmapaiz > 19) {
                return false;
            }
            var inSatArea = false;
            var bbarea = 0;
            var curmapcentr = map.getView().getCenter();
            do {
                var BBX = new mapLibraries.ol.extent.boundingExtent([
                    mapLibraries.ol.proj.fromLonLat(AIbbox[bbarea][0]),
                    mapLibraries.ol.proj.fromLonLat(AIbbox[bbarea][1])
                ]);
                inSatArea = mapLibraries.ol.extent.containsCoordinate(BBX, curmapcentr);
                bbarea++;
            } while (!inSatArea && bbarea < 20);
            return inSatArea;
        };
        var satelliteSource = new mapLibraries.ol.layer.Tile({
            source: new mapLibraries.ol.source.XYZ({
                format: new mapLibraries.ol.format.MVT(),
                maxZoom: 16,
                url:
                    process.env.API_URL + ".slpy.com/v1/app/aerial-imagery/{z}/{x}/{y}.png?key=" +
                    settings.apiKey
            }),
            minZoom: 0,
            maxZoom: 19,
            zindex: 0
        });
        //use below for ie9 since vector overlay will be missing
        var satelliteSourceRaster = new mapLibraries.ol.layer.Tile({
            source: new mapLibraries.ol.source.XYZ({
                format: new mapLibraries.ol.format.MVT(),
                maxZoom: 16,
                url:
                    process.env.API_URL + ".slpy.com/v1/app/aerial-topo/{z}/{x}/{y}.png?key=" +
                    settings.apiKey
            }),
            minZoom: 0,
            maxZoom: 19,
            zindex: 0
        });
        class AIbutton extends mapLibraries.ol.control.Control {
            constructor(opt_options) {
                var options = opt_options || {};
                var AIicon = document.createElement("button");
                AIicon.style.cssText =
                    'background-image: url("https://www.slpy.com/img/AerialImagery.png");background-size: contain;border-radius: 4px; width: 45px; height: 45px';
                AIicon.setAttribute("id", "AerialImageryIcon");
                var element = document.createElement("div");
                element.className = "ol-control";
                element.setAttribute("id", "AerialImageryButton");
                element.style.cssText =
                    "bottom: 0; right: 8px; margin-bottom: 50px; width: 45px; height: 45px";
                element.appendChild(AIicon);
                super({
                    element: element,
                    target: options.target
                });
                AIicon.addEventListener(
                    "click",
                    this.AerialImageryControl.bind(this),
                    false
                );
            }
            AerialImageryControl() {

                if (mapState.aerialImageryOn) {
                    if (mapState.oldIE) {
                        this.getMap().removeLayer(satelliteSourceRaster);
                    } else {
                        this.getMap().removeLayer(satelliteSource);
                        if (typeof mapState.streetLevelOn !== "undefined") {
                            if (mapState.streetLevelOn) {
                                mapillarySource.setStyle(photoDot);
                            }
                        }
                    }
                    document.getElementById("AerialImageryIcon").style.backgroundImage =
                        "url('https://www.slpy.com/img/AerialImagery.png')";
                    mapState.aerialImageryOn = false;
                    map.getLayers().forEach(function (layer) {
                        layer.getSource().refresh();
                    });
                } else if (isInAerialArea()) {
                    mapState.aerialImageryOn = true;
                    //setting oldie true is temporary hack until we fix aerial on openlayers with a gl style
                    mapState.oldIE = true;
                    if (mapState.oldIE) {
                        map.addLayer(satelliteSourceRaster);
                    } else {
                        map.getLayers().forEach(function (layer) {
                            layer.getSource().refresh();
                        });
                        map.getLayers().insertAt(0, satelliteSource);
                        if (typeof mapState.streetLevelOn !== "undefined") {
                            if (mapState.streetLevelOn) {
                                mapillarySource.setStyle(photoDotAerial);
                            }
                        }
                    }
                    document.getElementById("AerialImageryIcon").style.backgroundImage =
                        "url('https://www.slpy.com/img/VectorImagery.png')";
                } else {
                    if (map.getView().getZoom() > 18) {
                        alert("No Aerial Imagery at this level.  Try zooming out.");
                    } else {
                        alert("No Aerial Imagery available in this region.");
                    }
                }
            }
        }
        map.addControl(new AIbutton());
        var showingAerialButton = true;
        var AerialButton = document.getElementById("AerialImageryButton");
        if (!isInAerialArea()) {
            AerialButton.style.display = "none";
            showingAerialButton = false;
        }
        map.on("moveend", function () {
            if (isInAerialArea() && !showingAerialButton) {
                AerialButton.style.display = "block";
                showingAerialButton = true;
            } else if (!isInAerialArea() && showingAerialButton) {
                AerialButton.style.display = "none";
                showingAerialButton = false;
                if (mapState.aerialImageryOn) {
                    document.getElementById("AerialImageryIcon").click();
                }
            }
        });
    } else if (mapState.maplibreLoaded) {
        var isInAerialAreaMb = function isInAerialAreaMb() {
            var curmapaiz = map.getZoom();
            if (curmapaiz < 7.5) {
                return true;
            } else if (curmapaiz > 18) {
                return false;
            }
            var inSatArea = false;
            var bbarea = 0;
            var curmapcentr = map.getCenter();
            do {
                var BBX = new mapLibraries.maplibregl.LngLatBounds(AIbbox[bbarea]);
                inSatArea = BBX.contains(curmapcentr);
                bbarea++;
            } while (!inSatArea && bbarea < 20);
            return inSatArea;
        };
        var originalStyle = "";
        var AerialImageryControl = function AerialImageryControl() { };
        var AerialImagery = function AerialImagery() {
            if (mapState.aerialImageryOn) {
                if (typeof mapState.streetLevelOn !== "undefined") {
                    if (!mapState.streetLevelOn) {
                        map.setStyle(originalStyle);
                        if (map.getLayer("mimgLayer")) {
                            map.removeLayer("mimgLayer");
                        }
                        if (map.getLayer("streetLevelIcon")) {
                            map.removeLayer("streetLevelIcon");
                        }
                    } else {
                        var slicosour = map.getSource("streetLevelIcon");
                        var mimgsour = map.getSource("mimgLayer");
                        var mimglay = map.getLayer("mimgLayer");
                        var slilay = map.getLayer("streetLevelIcon");
                        map.setStyle(originalStyle);
                        if (!mimgsour) {
                            map.addSource("mimgLayer", {
                                type: "vector",
                                tiles: mimgsour["tiles"],
                                minzoom: mimgsour["minzoom"],
                                maxzoom: mimgsour["maxzoom"]
                            });
                        }
                        if (!slicosour) {
                            map.addSource("streetLevelIcon", {
                                type: "geojson",
                                data: slicosour["_data"]
                            });
                        }
                        if (!mimglay) {
                            map.addLayer({
                                id: "mimgLayer",
                                type: "circle",
                                source: "mimgLayer",
                                "source-layer": "mapillary-images",
                                minzoom: mimglay["minzoom"],
                                maxzoom: mimglay["maxzoom"],
                                paint: mimglay["paint_"]
                            });
                        }
                        if (!slilay) {
                            map.addLayer({
                                id: "streetLevelIcon",
                                type: "symbol",
                                source: "streetLevelIcon",
                                paint: slilay["paint_"],
                                layout: slilay["layout_"]
                            });
                        }
                    }
                } else {
                    map.setStyle(originalStyle);
                }
                document.getElementById("AerialImageryIcon").style.backgroundImage =
                    "url('https://www.slpy.com/img/AerialImagery.png')";
                mapState.aerialImageryOn = false;
            } else if (isInAerialAreaMb()) {
                if (aerialImageryLoad) {
                    map.addSource("satellite", aerialImagerySource);
                    aerialImageryLoad = false;
                }
                originalStyle = map.getStyle();
                if (typeof mapState.streetLevelOn !== "undefined") {
                    if (mapState.streetLevelOn) {
                        map.setPaintProperty(
                            "mimgLayer",
                            "circle-color",
                            "rgba(53, 175, 109,0.5)"
                        );
                    }
                }
                map.addLayer(
                    {
                        id: "satellite",
                        type: "raster",
                        source: "satellite",
                        minzoom: 0,
                        maxzoom: 18
                    },
                    "necountries-4"
                );
                document.getElementById("AerialImageryIcon").style.backgroundImage =
                    "url('https://www.slpy.com/img/VectorImagery.png')";
                map.setLayoutProperty("roads-casing", "visibility", "none");
                map.setLayoutProperty("roads-motorway-casing", "visibility", "none");
                map.setLayoutProperty("highway-area-fill", "visibility", "none");
                map.setLayoutProperty("highway-motorway-shadow", "visibility", "none");
                map.setLayoutProperty("highway-trunk-shadow", "visibility", "none");
                map.setLayoutProperty("roads-low-zoom-shadow", "visibility", "none");
                map.setPaintProperty("highway-motorway", "line-color", "#edaa82");
                map.setPaintProperty("roads", "line-opacity", 0.5);
                map.setPaintProperty("roads-low-zoom-secondary", "line-opacity", 0.5);
                map.setPaintProperty("roads-low-zoom-trunk", "line-opacity", 0.3);
                map.setPaintProperty("highway-motorway", "line-opacity", 0.5);
                map.setPaintProperty("highway-trunk", "line-color", "#bbb");
                map.setPaintProperty("highway-trunk", "line-width", 1);
                map.setPaintProperty("highway-trunk", "line-opacity", 0.5);
                map.setPaintProperty("ferry-routes", "line-opacity", 0.5);
                map.setPaintProperty("roads-text-name", "text-color", "#000");
                map.setPaintProperty("roads-text-name", "text-halo-width", 1.25);
                map.setPaintProperty("placenames", "text-color", "#fff");
                map.setPaintProperty("placenames", "text-halo-color", "#000");
                map.setPaintProperty("placenames", "text-halo-width", 1);
                map.setPaintProperty("placenames-small", "text-color", "#fff");
                map.setPaintProperty("placenames-small", "text-halo-color", "#555");
                map.setPaintProperty("placenames-small", "text-halo-width", 1.5);
                map.setPaintProperty("ocean-points", "text-halo-color", "#4f6f80");
                map.setPaintProperty("ocean-points", "text-color", "#fff");
                map.setPaintProperty(
                    "state-names",
                    "text-halo-color",
                    "rgba(114, 83, 128, 0.6)"
                );
                map.setPaintProperty(
                    "state-names",
                    "text-color",
                    "rgba(255, 255, 255, 0.6)"
                );
                map.setPaintProperty(
                    "state-names-low-zoom",
                    "text-halo-color",
                    "rgba(114, 83, 128, 0.6)"
                );
                map.setPaintProperty(
                    "state-names-low-zoom",
                    "text-color",
                    "rgba(255, 255, 255, 0.6)"
                );
                map.setPaintProperty(
                    "amenity-points-landuse",
                    "text-halo-color",
                    "#fff"
                );
                map.setPaintProperty("amenity-points-landuse", "text-halo-width", 1);
                map.setPaintProperty("text-poly-low-zoom", "text-halo-color", "#fff");
                map.setPaintProperty("text-poly-low-zoom", "text-halo-width", 0.5);
                map.setPaintProperty("amenity-points-low-icon", "text-halo-width", 0.5);
                map.setPaintProperty("amenity-points-icon", "text-halo-width", 0.5);
                map.setPaintProperty("amenity-points-mid-icon", "text-halo-width", 0.5);
                map.setPaintProperty(
                    "amenity-points-high-icon",
                    "text-halo-width",
                    0.5
                );
                map.setPaintProperty("amenity-points-low", "text-halo-width", 0.6);
                map.setPaintProperty("amenity-points-text", "text-halo-width", 0.6);
                map.setPaintProperty("amenity-points-mid", "text-halo-width", 0.6);
                map.setPaintProperty("amenity-points-high", "text-halo-width", 0.6);
                map.setPaintProperty("necountries-4", "line-color", "#222");
                map.setPaintProperty("necountries-2", "line-color", "#222");
                map.setPaintProperty("admin-mid-zoom-2", "line-color", "#222");
                map.setPaintProperty("admin-mid-zoom-3", "line-color", "#222");
                map.setPaintProperty("admin-mid-zoom-4", "line-color", "#222");
                map.setPaintProperty("admin-high-zoom-2", "line-color", "#222");
                map.setPaintProperty("admin-high-zoom-3", "line-color", "#222");
                map.setPaintProperty("admin-high-zoom-4", "line-color", "#222");
                mapState.aerialImageryOn = true;
            } else {
                if (map.getZoom() > 18) {
                    alert("No Aerial Imagery at this level.  Try zooming out.");
                } else {
                    alert("No Aerial Imagery available in this region.");
                }
            }
        };
        var aerialImagerySource = {
            type: "raster",
            scheme: "xyz",
            tiles: [
                process.env.API_URL + ".slpy.com/v1/app/aerial-imagery/{z}/{x}/{y}.png?key=" +
                settings.apiKey
            ],
            minzoom: 0,
            maxzoom: 16,
            tileSize: 256
        };
        AerialImageryControl.prototype.onAdd = function (map) {
            this._map = map;
            this._container = document.createElement("div");
            this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
            this._container.style.cssText = "pointer-events: auto;";
            this._container.setAttribute("id", "AerialImageryButton");
            var AIbutton = document.createElement("button");
            AIbutton.style.width = "45px";
            AIbutton.style.height = "45px";
            AIbutton.addEventListener("click", AerialImagery);
            this._container.appendChild(AIbutton);
            var AIicon = document.createElement("span");
            AIicon.style.cssText =
                'background-image: url("https://www.slpy.com/img/AerialImagery.png");background-size: contain;border-radius: 4px;';
            AIicon.setAttribute("id", "AerialImageryIcon");
            AIicon.className = "maplibregl-ctrl-icon";
            AIbutton.appendChild(AIicon);
            return this._container;
        };
        AerialImageryControl.prototype.onRemove = function () {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        };
        AerialImageryControl = new AerialImageryControl();
        map.addControl(AerialImageryControl, "bottom-right");
        var showingAerialButton = true;
        var AerialButton = document.getElementById("AerialImageryButton");
        if (!isInAerialAreaMb()) {
            AerialButton.style.display = "none";
            showingAerialButton = false;
        }
        map.on("idle", function () {
            if (isInAerialAreaMb() && !showingAerialButton) {
                AerialButton.style.display = "block";
                showingAerialButton = true;
            } else if (!isInAerialAreaMb() && showingAerialButton) {
                AerialButton.style.display = "none";
                showingAerialButton = false;
                if (mapState.aerialImageryOn) {
                    AerialImagery();
                }
            }
        });
    }
}