//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { loadScript, distanceInKM } from "./utils.js";
import { mapState,  mapLibraries } from "./globals.js";

export function waitForMapillary(mpyKey, map) {
    if (typeof mapillary === "undefined") {
        setTimeout(function () {
            waitForMapillary(mpyKey, map);
        }, 100);
    } else {
        addMapillary(mpyKey, map);
    }
}

export function onMapillaryChange(change) {
    var evt = document.createEvent("Event");
    evt.state = change;
    evt.initEvent("StreetLevel", true, false);
    window.dispatchEvent(evt);
}

export function addMapillary(MapillaryKey, map) {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) {
        // IE 10 or mapLibraries.older not compatible with Mapillary
        onMapillaryChange("failed load");
        return;
    }
    var trident = ua.indexOf("Trident/");
    if (trident > 0) {
        if (typeof mapLibraries.ol === "undefined") {
            //IE 11 only works well with OpenLayers
            onMapillaryChange("failed load");
            return;
        }
    }
    if (typeof mapillary === "undefined") {
        //console.error("Slpy Developer: Street Level requires Mapillary 4.0+.  Please upgrade your library and obtain a new token, as Mapillary has disabled previous methods and keys.");
        //attempt to load mapillary
        var mplycss = document.createElement("link");
        mplycss.href = "https://unpkg.com/mapillary-js@4.1.1/dist/mapillary.css";
        mplycss.rel = "stylesheet";
        document.head.appendChild(mplycss);
        loadScript("https://unpkg.com/mapillary-js@4.1.1/dist/mapillary.js");
        waitForMapillary(MapillaryKey, map);
    }
    var mlyContainer = document.getElementById("mly");
    var maptarContainer = undefined;
    if (typeof mapLibraries.ol !== "undefined") {
        maptarContainer = map.getTargetElement();
    } else {
        maptarContainer = map.getContainer();
    }
    if (!mlyContainer) {
        // user didnt add mapillary divs, so we will try for them
        var newDiv = document.createElement('div');
        newDiv.id = 'map-mapillary';
        
        // Insert the new outer div before the old element
        maptarContainer.parentNode.insertBefore(newDiv, maptarContainer);
        
        // Move the old element into the new outer div
        newDiv.appendChild(maptarContainer);
        
        // Create the new inner div
        var mlyDiv = document.createElement('div');
        mlyDiv.id = 'mly';
        
        // Insert the new inner div into the new outer div
        newDiv.appendChild(mlyDiv);
    }
    
    if (typeof mapillary !== "undefined") {
        if (typeof mapLibraries.ol !== "undefined") {
            onMapillaryChange("loaded");
            var streetLevelIcon = new mapLibraries.ol.style.Style({
                text: new mapLibraries.ol.style.Text({
                    text: "\uF124",
                    scale: 1,
                    font: 'Normal 900 18px "Font Awesome 5 Free"',
                    fill: new mapLibraries.ol.style.Fill({
                        color: "#a11d26"
                    }),
                    stroke: new mapLibraries.ol.style.Stroke({
                        color: "white",
                        width: 3
                    })
                })
            });
            var updateBearingStyle = function updateBearingStyle(bearing) {
                return [new mapLibraries.ol.style.Style({
                    text: new mapLibraries.ol.style.Text({
                        text: "\uF124",
                        scale: 1,
                        font: 'Normal 900 18px "Font Awesome 5 Free"',
                        textBaseline: "middle",
                        textAlign: "center",
                        rotation: (bearing * Math.PI) / 180 - 45,
                        fill: new mapLibraries.ol.style.Fill({
                            color: "#a11d26"
                        }),
                        stroke: new mapLibraries.ol.style.Stroke({
                            color: "white",
                            width: 3
                        })
                    })
                })];
            };
            var photoDot = new mapLibraries.ol.style.Style({
                image: new mapLibraries.ol.style.Circle({
                    fill: new mapLibraries.ol.style.Fill({
                        color: "rgba(53, 175, 109,0.2)"
                    }),
                    radius: 4
                })
            });
            var photoDotAerial = new mapLibraries.ol.style.Style({
                image: new mapLibraries.ol.style.Circle({
                    fill: new mapLibraries.ol.style.Fill({
                        color: "rgba(53, 175, 109,0.5)"
                    }),
                    radius: 4
                })
            });
            var mapillarySource = new mapLibraries.ol.layer.VectorTile({
                source: new mapLibraries.ol.source.VectorTile({
                    format: new mapLibraries.ol.format.MVT(),
                    tileGrid: mapLibraries.ol.tilegrid.createXYZ({
                        maxZoom: 14
                    }),
                    tilePixelRatio: 16,
                    maxZoom: 14,
                    url:
                        "https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=" +
                        MapillaryKey
                }),
                style: photoDot,
                minZoom: 14
            });

            class streetLevelButton extends mapLibraries.ol.control.Control {
                constructor(opt_options) {
                    var options = opt_options || {};
                    var SLbutton = document.createElement("button");
                    SLbutton.style.cssText = 'font: 900 1.14em "Font Awesome 5 Free"';
                    SLbutton.innerHTML = "\uF554";
                    var element = document.createElement("div");
                    element.className = "ol-control";
                    element.style.cssText =
                        "bottom: 55px; right: 8px; margin-bottom: 50px";
                    element.appendChild(SLbutton);
                    super({
                        element: element,
                        target: options.target
                    });
                    SLbutton.addEventListener(
                        "click",
                        this.handleStreetLevel.bind(this),
                        false
                    );
                }
                handleStreetLevel() {
                    if (map.getView().getZoom() < 12 && !mapState.streetLevelOn) {
                        alert("Zoom in to get Street Level Imagery");
                    } else {
                        var mpjscanvas = document.getElementsByClassName(
                            "mapillary-js-canvas"
                        )[0];
                        var mpjsdom =
                            document.getElementsByClassName("mapillary-js-dom")[0];
                        if (mapState.streetLevelOn) {
                            mapillarySource.setStyle(photoDot);
                            this.getMap().removeLayer(mapillarySource);
                            this.getMap().removeLayer(movingPointLayer);
                            mlyContainer.style.display = "none";
                            maptarContainer.style.height = "100%";
                            maptarContainer.style.width = "100%";
                            map.updateSize();
                            movingPointLayer.setVisible(false);
                            if (typeof mpjscanvas !== "undefined") {
                                mpjscanvas.style.display = "none";
                            }
                            if (typeof mpjsdom !== "undefined") {
                                mpjsdom.style.display = "none";
                            }
                            onMapillaryChange("closed");
                            mapState.streetLevelOn = false;
                        } else {
                            var centerCurrent = mapLibraries.ol.proj.toLonLat(map.getView().getCenter());
                            var bboxCurrent = mapLibraries.ol.proj.transformExtent(
                                map.getView().calculateExtent(map.getSize()),
                                "EPSG:900913",
                                "EPSG:4326"
                            );
                            var bboxRad =
                                distanceInKM(
                                    bboxCurrent[0],
                                    bboxCurrent[1],
                                    bboxCurrent[2],
                                    bboxCurrent[3]
                                ) * 1000;
                            var maptarParent = maptarContainer.parentNode;
                            var xmlhttp = new XMLHttpRequest();
                            xmlhttp.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    var myArr = JSON.parse(this.responseText);
                                    if (typeof myArr.data[0] !== "undefined") {
                                        onMapillaryChange("active");
                                        map.addLayer(mapillarySource);
                                        map.addLayer(movingPointLayer);
                                        if (typeof mapState.aerialImageryOn !== "undefined") {
                                            if (mapState.aerialImageryOn) {
                                                mapillarySource.setStyle(photoDotAerial);
                                            }
                                        }
                                        mapState.streetLevelOn = true;
                                        mly.moveTo(myArr.data[0].id)["catch"](function (reason) {
                                            console.log("Mapillary missing image");
                                        });
                                        featureOverlay.setStyle(
                                            updateBearingStyle(myArr.data[0].compass_angle)
                                        );
                                        if (!movingPointLayer.getVisible()) {
                                            movingPointLayer.setVisible(true);
                                        }
                                        if (map.getView().getZoom() < 18.5) {
                                            map.getView().animate({
                                                zoom: 18.5,
                                                duration: 250
                                            });
                                        }
                                        mpjscanvas = document.getElementsByClassName(
                                            "mapillary-js-canvas"
                                        )[0];
                                        mpjsdom =
                                            document.getElementsByClassName("mapillary-js-dom")[0];
                                        if (typeof mpjscanvas !== "undefined") {
                                            mpjscanvas.style.display = "initial";
                                        }
                                        if (typeof mpjsdom !== "undefined") {
                                            mpjsdom.style.display = "initial";
                                        }
                                    } else {
                                        onMapillaryChange("closed");
                                        mlyContainer.style.display = "none";
                                        maptarContainer.style.width = "100%";
                                        maptarContainer.style.height = "100%";
                                        map.updateSize();
                                        if (typeof mpjscanvas !== "undefined") {
                                            mpjscanvas.style.display = "none";
                                        }
                                        if (typeof mpjsdom !== "undefined") {
                                            mpjsdom.style.display = "none";
                                        }
                                        if (map.getView().getZoom() <= 15) {
                                            alert(
                                                "No street level images available here.  Try zooming in."
                                            );
                                        } else {
                                            alert("No street level images available here.");
                                        }
                                    }
                                } else if (this.readyState == 4) {
                                    onMapillaryChange("closed");
                                    mlyContainer.style.display = "none";
                                    maptarContainer.style.width = "100%";
                                    maptarContainer.style.height = "100%";
                                    map.updateSize();
                                    if (typeof mpjscanvas !== "undefined") {
                                        mpjscanvas.style.display = "none";
                                    }
                                    if (typeof mpjsdom !== "undefined") {
                                        mpjsdom.style.display = "none";
                                    }
                                    console.log("Could not connect to Mapillary");
                                }
                            };
                            onMapillaryChange("opened");
                            mlyContainer.style.display = "block";
                            if (maptarParent.offsetHeight > maptarParent.offsetWidth) {
                                maptarContainer.style.height = "35%";
                                maptarContainer.style.width = "100%";
                                mlyContainer.style.width = "100%";
                                mlyContainer.style.height = "65%";
                            } else {
                                maptarContainer.style.width = "35%";
                                maptarContainer.style.height = "100%";
                                mlyContainer.style.height = "100%";
                                mlyContainer.style.width = "65%";
                            }
                            mly.resize();
                            map.updateSize();
                            xmlhttp.open(
                                "GET",
                                "https://graph.mapillary.com/images?access_token=" +
                                MapillaryKey +
                                "&fields=image_key,compass_angle&limit=1&closeto=" +
                                centerCurrent.toString() +
                                "&bbox=" +
                                bboxCurrent.toString(),
                                true
                            );
                            //xmlhttp.open("GET", 'https://a.mapillary.com/v3/images?client_id='+MapillaryKey+'&closeto='+centerCurrent.toString()+'&bbox='+bboxCurrent.toString()+"&radius="+bboxRad.toFixed(0), true);
                            xmlhttp.send();
                        }
                    }
                }
            }
            map.addControl(new streetLevelButton());
            var pointFeature = new mapLibraries.ol.Feature({
                geometry: new mapLibraries.ol.geom.Point(ol.proj.fromLonLat(center))
            });
            pointFeature.setStyle([streetLevelIcon]);
            var movingPointLayer = new mapLibraries.ol.layer.Vector({
                source: new mapLibraries.ol.source.Vector({
                    features: [pointFeature]
                }),
                visible: false
            });
            var featureOverlay = new mapLibraries.ol.layer.Vector({
                source: new mapLibraries.ol.source.Vector(),
                map: map,
                style: [streetLevelIcon]
            });
            var mly = new mapillary.Viewer({
                accessToken: MapillaryKey,
                component: {
                    cover: false
                },
                container: "mly"
            });
            var highlight;
            var displayFeatureInfo = function displayFeatureInfo(pixel, isClick) {
                var feature = map.forEachFeatureAtPixel(
                    pixel,
                    function (feature, layer) {
                        return feature;
                    },
                    {
                        layerFilter: function layerFilter(layer) {
                            return layer === mapillarySource;
                        },
                        hitTolerance: 5
                    }
                );
                if (feature) {
                    if (isClick) {
                        var bearing = feature.get("compassAngle");
                        mly.moveTo(feature.get("id"))["catch"](function (reason) {
                            console.log("Mapillary missing image");
                        });
                        featureOverlay.setStyle(updateBearingStyle(bearing));
                        if (!movingPointLayer.getVisible()) {
                            mlyContainer.style.display = "block";
                            var maptarParent = maptarContainer.parentNode;
                            if (maptarParent.offsetHeight > maptarParent.offsetWidth) {
                                maptarContainer.style.height = "35%";
                                maptarContainer.style.width = "100%";
                                mlyContainer.style.width = "100%";
                                mlyContainer.style.height = "65%";
                            } else {
                                maptarContainer.style.width = "35%";
                                maptarContainer.style.height = "100%";
                                mlyContainer.style.height = "100%";
                                mlyContainer.style.width = "65%";
                            }
                            mly.resize();
                            map.updateSize();
                            movingPointLayer.setVisible(true);
                        }
                    }
                    if (feature !== highlight) {
                        if (highlight) {
                            if (typeof highlight !== "undefined") {
                                try {
                                    featureOverlay.getSource().removeFeature(highlight);
                                } catch (err) {
                                    //sometimes causes error due to latency or missing keys
                                }
                            }
                        }
                        if (feature) {
                            if (typeof feature !== "undefined") {
                                try {
                                    featureOverlay.getSource().addFeature(feature);
                                } catch (err) {
                                    //sometimes causes error due to latency or missing keys
                                }
                            }
                        }
                        highlight = feature;
                    }
                } else {
                    return;
                }
            };
            mly.on("image", function (event) {
                if (featureOverlay.getVisible()) {
                    featureOverlay.setVisible(false);
                }
                var lonLat = mapLibraries.ol.proj.fromLonLat([
                    event.image.originalLngLat.lng,
                    event.image.originalLngLat.lat
                ]);
                map.getView().setCenter(lonLat);
                pointFeature.getGeometry().setCoordinates(lonLat);
                pointFeature.setStyle(updateBearingStyle(event.image.compassAngle));
            });
            map.on("click", function (e) {
                displayFeatureInfo(e.pixel, true);
            });
            window.addEventListener("resize", function () {
                if (mapState.streetLevelOn) {
                    var maptarParent = maptarContainer.parentNode;
                    if (maptarParent.offsetHeight > maptarParent.offsetWidth) {
                        maptarContainer.style.height = "35%";
                        maptarContainer.style.width = "100%";
                        mlyContainer.style.width = "100%";
                        mlyContainer.style.height = "65%";
                    } else {
                        maptarContainer.style.width = "35%";
                        maptarContainer.style.height = "100%";
                        mlyContainer.style.height = "100%";
                        mlyContainer.style.width = "65%";
                    }
                    mly.resize();
                    map.updateSize();
                }
            });
        } else {
            var StreetLevelControl = function StreetLevelControl() { };
            var streetLevel = function streetLevel() {
                if (map.getZoom() < 12 && !mapState.streetLevelOn) {
                    alert("Zoom in to get Street Level Imagery");
                } else {
                    var mpjscanvas = document.getElementsByClassName(
                        "mapillary-js-canvas"
                    )[0];
                    var mpjsdom = document.getElementsByClassName("mapillary-js-dom")[0];
                    if (mapState.streetLevelOn) {
                        map.removeLayer("mimgLayer");
                        map.removeLayer("streetLevelIcon");
                        mlyContainer.style.display = "none";
                        maptarContainer.style.height = "100%";
                        maptarContainer.style.width = "100%";
                        map.resize();
                        if (typeof mpjscanvas !== "undefined") {
                            mpjscanvas.style.display = "none";
                        }
                        if (typeof mpjsdom !== "undefined") {
                            mpjsdom.style.display = "none";
                        }
                        onMapillaryChange("closed");
                        mapState.streetLevelOn = false;
                    } else {
                        var centerCurrent = map.getCenter().toArray();
                        var bboxCurrent = map.getBounds().toArray();
                        var bboxRad =
                            distanceInKM(
                                bboxCurrent[0][0],
                                bboxCurrent[0][1],
                                bboxCurrent[1][0],
                                bboxCurrent[1][1]
                            ) * 1000;
                        var xmlhttp = new XMLHttpRequest();
                        if (streetLevelLoad) {
                            map.addSource("mimgLayer", mapillarySource);
                            map.addSource("streetLevelIcon", streetLevelIconSource);
                            streetLevelLoad = false;
                        }
                        xmlhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                var myArr = JSON.parse(this.responseText);
                                //alert(myArr.data[0].id);
                                if (typeof myArr.data[0] !== "undefined") {
                                    var cirOpac = "0.2";
                                    if (typeof mapState.aerialImageryOn !== "undefined") {
                                        if (mapState.aerialImageryOn) {
                                            cirOpac = "0.5";
                                        }
                                    }
                                    map.addLayer({
                                        id: "mimgLayer",
                                        type: "circle",
                                        source: "mimgLayer",
                                        "source-layer": "image",
                                        minzoom: 14,
                                        maxzoom: 22,
                                        paint: {
                                            "circle-color": "rgba(53, 175, 109," + cirOpac + ")"
                                        }
                                    });
                                    map.addLayer({
                                        id: "streetLevelIcon",
                                        type: "symbol",
                                        source: "streetLevelIcon",
                                        paint: {
                                            "text-color": "#a11d26",
                                            "text-halo-color": "#fff",
                                            "text-halo-width": 2.25,
                                            "text-translate": [0, 0]
                                        },
                                        layout: {
                                            "text-field": "\uF124",
                                            "text-size": 20,
                                            "text-font": ["fasolid-900"],
                                            "text-rotate": ["get", "bearing"],
                                            "text-anchor": "center",
                                            "text-offset": [0, 0]
                                        }
                                    });
                                    mapState.streetLevelOn = true;
                                    onMapillaryChange("active");
                                    mly.moveTo(myArr.data[0].id)["catch"](function (reason) {
                                        console.log("Mapillary missing image");
                                    });
                                    if (map.getZoom() < 17.5) {
                                        map.zoomTo(17.5);
                                    }
                                    mpjscanvas = document.getElementsByClassName(
                                        "mapillary-js-canvas"
                                    )[0];
                                    mpjsdom =
                                        document.getElementsByClassName("mapillary-js-dom")[0];
                                    if (typeof mpjscanvas !== "undefined") {
                                        mpjscanvas.style.display = "initial";
                                    }
                                    if (typeof mpjsdom !== "undefined") {
                                        mpjsdom.style.display = "initial";
                                    }
                                } else {
                                    mlyContainer.style.display = "none";
                                    maptarContainer.style.height = "100%";
                                    maptarContainer.style.width = "100%";
                                    map.resize();
                                    if (typeof mpjscanvas !== "undefined") {
                                        mpjscanvas.style.display = "none";
                                    }
                                    if (typeof mpjsdom !== "undefined") {
                                        mpjsdom.style.display = "none";
                                    }
                                    onMapillaryChange("closed");
                                    if (map.getZoom() <= 15) {
                                        alert(
                                            "No street level images available here.  Try zooming in."
                                        );
                                    } else {
                                        alert("No street level images available here.");
                                    }
                                }
                            } else if (this.readyState == 4) {
                                mlyContainer.style.display = "none";
                                maptarContainer.style.height = "100%";
                                maptarContainer.style.width = "100%";
                                map.resize();
                                if (typeof mpjscanvas !== "undefined") {
                                    mpjscanvas.style.display = "none";
                                }
                                if (typeof mpjsdom !== "undefined") {
                                    mpjsdom.style.display = "none";
                                }
                                onMapillaryChange("closed");
                            }
                        };
                        mlyContainer.style.display = "block";
                        var maptarParent = maptarContainer.parentNode;
                        if (maptarParent.offsetHeight > maptarParent.offsetWidth) {
                            maptarContainer.style.height = "35%";
                            maptarContainer.style.width = "100%";
                            mlyContainer.style.width = "100%";
                            mlyContainer.style.height = "65%";
                        } else {
                            maptarContainer.style.width = "35%";
                            maptarContainer.style.height = "100%";
                            mlyContainer.style.height = "100%";
                            mlyContainer.style.width = "65%";
                        }
                        mly.resize();
                        map.resize();
                        onMapillaryChange("opened");
                        xmlhttp.open(
                            "GET",
                            "https://graph.mapillary.com/images?access_token=" +
                            MapillaryKey +
                            "&fields=image_key&limit=1&closeto=" +
                            centerCurrent[0] +
                            "," +
                            centerCurrent[1] +
                            "&bbox=" +
                            bboxCurrent[0][0] +
                            "," +
                            bboxCurrent[0][1] +
                            "," +
                            bboxCurrent[1][0] +
                            "," +
                            bboxCurrent[1][1],
                            true
                        );
                        //'https://a.mapillary.com/v3/images?client_id='+MapillaryKey+'&closeto='+centerCurrent[0]+','+centerCurrent[1]+'&bbox='+bboxCurrent[0][0]+','+bboxCurrent[0][1]+','+bboxCurrent[1][0]+','+bboxCurrent[1][1]+'&radius='+bboxRad.toFixed(0), true);
                        xmlhttp.send();
                    }
                }
            };
            onMapillaryChange("loaded");
            var streetLevelIconSource = {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [0, 0]
                    },
                    properties: {
                        bearing: 90
                    }
                }
            };
            var mapillarySource = {
                type: "vector",
                tiles: [
                    "https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=" +
                    MapillaryKey
                ],
                minzoom: 14,
                maxzoom: 14
            };
            StreetLevelControl.prototype.onAdd = function (map) {
                this._map = map;
                this._container = document.createElement("div");
                this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
                this._container.style.cssText = "pointer-events: auto;";
                var SLbutton = document.createElement("button");
                SLbutton.setAttribute("id", "streetLevButton");
                SLbutton.addEventListener("click", streetLevel);
                this._container.appendChild(SLbutton);
                var SLicon = document.createElement("span");
                SLicon.style.cssText =
                    'background-image: url("' + process.env.API_URL + '.slpy.com/symbols/walking-solid.svg");background-size: 1em;';
                SLicon.className = "maplibregl-ctrl-icon";
                SLbutton.appendChild(SLicon);
                return this._container;
            };
            StreetLevelControl.prototype.onRemove = function () {
                this._container.parentNode.removeChild(this._container);
                this._map = undefined;
            };
            StreetLevelControl = new StreetLevelControl();
            map.addControl(StreetLevelControl, "bottom-right");
            mapState.streetLevelOn = false;
            var streetLevelLoad = true;
            var mly = new mapillary.Viewer({
                accessToken: MapillaryKey,
                component: {
                    cover: false
                },
                container: "mly"
            });
            mly.on("image", function (event) {
                var lngLat = [
                    event.image.originalLngLat.lng,
                    event.image.originalLngLat.lat
                ];
                var bearing = event.image.compassAngle - 45;
                var data = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: lngLat
                    },
                    properties: {
                        bearing: bearing
                    }
                };
                map.getSource("streetLevelIcon").setData(data);
                map.flyTo({
                    center: lngLat
                });
            });
            map.on("click", function (e) {
                if (typeof mapState.streetLevelOn !== "undefined") {
                    if (mapState.streetLevelOn) {
                        var feature = map.queryRenderedFeatures(e.point, {
                            layers: ["mimgLayer"]
                        });
                        if (typeof feature[0] !== "undefined") {
                            var fkey = feature[0].properties.id;
                            mly.moveTo(fkey)["catch"](function (reason) {
                                console.log("Mapillary missing image");
                            });
                        }
                    }
                }
            });
            window.addEventListener("resize", function () {
                if (mapState.streetLevelOn) {
                    var maptarParent = maptarContainer.parentNode;
                    if (maptarParent.offsetHeight > maptarParent.offsetWidth) {
                        maptarContainer.style.height = "35%";
                        maptarContainer.style.width = "100%";
                        mlyContainer.style.width = "100%";
                        mlyContainer.style.height = "65%";
                    } else {
                        maptarContainer.style.width = "35%";
                        maptarContainer.style.height = "100%";
                        mlyContainer.style.height = "100%";
                        mlyContainer.style.width = "65%";
                    }
                    mly.resize();
                    map.resize();
                }
            });
        }
    }
}