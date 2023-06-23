//Copyright 2023, Slpy, all rights reserved.
//Check out https://github.com/Spy-API/Slpy-JS and https://www.slpy.com/legal for licensing and terms

import { mapLibraries } from './globals.js'
import { distanceInKM } from './utils.js';

export let hasPopupInfo = false;
export let markerVectorSource;
export let markerVectorLayer;

export function addMarkers(markers, map, style) {
    var style = style === undefined ? "default" : style;
    var markerFeature = [];
    if (typeof mapLibraries.ol !== "undefined") {
        for (var i = 0; i < markers.length; i++) {
            if (style == "default") {
                markerFeature.push(
                    createMarker(
                        [markers[i].data[1], markers[i].data[0]],
                        markers[i].name,
                        i,
                        style
                    )
                );
            } else {
                var markerFeatures = createMarker(
                    [markers[i].data[1], markers[i].data[0]],
                    markers[i].name,
                    i,
                    style
                );
                markerFeature.push(markerFeatures[0], markerFeatures[1]);
            }
            if (typeof markers[i].data[2] !== "undefined") {
                if (markers[i].data[2] !== "") {
                    hasPopupInfo = true;
                }
            }
        }
        markerVectorSource = new mapLibraries.ol.source.Vector({
            features: markerFeature
        });
        markerVectorLayer = new mapLibraries.ol.layer.Vector({
            source: markerVectorSource,
            className: "ol-markers"
        });
        map.once("postrender", function (event) {
            map.addLayer(markerVectorLayer);
        });
        if (hasPopupInfo) {
            if (document.getElementById("popup") == null) {
                var popupe = document.createElement("div");
                popupe.innerHTML =
                    '<a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content"></div>';
                popupe.id = "popup";
                popupe.classList.add("ol-popup");
                map.getTargetElement().appendChild(popupe);
            }
            var container = document.getElementById("popup");
            var content = document.getElementById("popup-content");
            var closer = document.getElementById("popup-closer");
            markerOverlay = new mapLibraries.ol.Overlay({
                element: container,
                autoPan: true,
                position: undefined,
                autoPanAnimation: {
                    duration: 250
                }
            });
            map.addOverlay(markerOverlay);
            closer.onclick = function () {
                markerOverlay.setPosition(undefined);
                closer.blur();
                return false;
            };
            map.on("singleclick", function (evt) {
                var id = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature.getId();
                });
                if (typeof id === "string") {
                    markerIndex = id.replace("marker:", "");
                    if (
                        markerIndex >= 0 &&
                        markers[markerIndex].data[2] != "" &&
                        typeof markers[markerIndex].data[2] !== "undefined"
                    ) {
                        container.style.display = "block";
                        content.innerHTML = markers[markerIndex].data[2];
                        markerOverlay.setPosition(
                            mapLibraries.ol.proj.fromLonLat([
                                markers[markerIndex].data[1],
                                markers[markerIndex].data[0]
                            ])
                        );
                    } else {
                        container.style.display = "none";
                    }
                }
            });
        }
    } else {

        var icon =
            '<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
        var iconSolid =
            '<!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>';
        for (var i = 0; i < markers.length; i++) {
            var iconStyle =
                '<svg xmlns="http://www.w3.org/2000/svg" id="marker-' +
                parseInt([i]).toString() +
                '" style="fill: #a11c25;width:27px; height:36px;stroke:#fff;stroke-width:15px;filter: drop-shadow(1px 2px 1px rgba(0,0,0,0.4));" viewBox="0 0 384 512">';
            hasPopupInfo = false;
            if (typeof markers[i].data[2] !== "undefined") {
                if (markers[i].data[2] !== "") {
                    hasPopupInfo = true;
                }
            }
            if (style == "default") {
                if (hasPopupInfo) {
                    var falayers = document.createElement("span");
                    falayers.innerHTML = iconStyle + icon;
                    new mapLibraries.maplibregl.Marker({
                        element: falayers,
                        anchor: "bottom",
                        offset: [0, 5]
                    })
                        .setLngLat([markers[i].data[1], markers[i].data[0]])
                        .setPopup(
                            new mapLibraries.maplibregl.Popup({
                                offset: [0, -36],
                                className: "popup-" + [i]
                            }).setHTML(markers[i].data[2])
                        )
                        .addTo(map);
                } else {
                    var falayers = document.createElement("span");
                    falayers.innerHTML = iconStyle + icon;
                    new mapLibraries.maplibregl.Marker({
                        element: falayers,
                        anchor: "bottom",
                        offset: [0, 5]
                    })
                        .setLngLat([markers[i].data[1], markers[i].data[0]])
                        .addTo(map);
                }
            } else {
                var markerTextStyle =
                    'position: absolute;font-weight: bold;top:5px;display: block; width:27px;left:0px;font-size:14px;color:white;text-align:center;text-shadow:-1px -1px 0 rgba(0,0,0,0.25), 1px -1px 0 rgba(0,0,0,0.25), -1px 1px 0 rgba(0,0,0,0.25), 1px 1px 0 rgba(0,0,0,0.25);font-family:"Open Sans", "Arial", "Verdana", "sans-serif"';
                if (hasPopupInfo) {
                    var falayers = document.createElement("span");
                    falayers.innerHTML = iconStyle + iconSolid;
                    var falayertext = document.createElement("span");
                    falayertext.innerHTML = (parseInt([i]) + 1).toString();
                    falayertext.setAttribute("style", markerTextStyle);
                    falayers.appendChild(falayertext);
                    new mapLibraries.maplibregl.Marker({
                        element: falayers,
                        anchor: "bottom",
                        offset: [0, 5]
                    })
                        .setLngLat([markers[i].data[1], markers[i].data[0]])
                        .setPopup(
                            new mapLibraries.maplibregl.Popup({
                                offset: [0, -36],
                                className: "popup-" + [i]
                            }).setHTML(markers[i].data[2])
                        )
                        .addTo(map);
                } else {
                    var falayers = document.createElement("span");
                    falayers.innerHTML = iconStyle + iconSolid;
                    var falayertext = document.createElement("span");
                    falayertext.innerHTML = (parseInt([i]) + 1).toString();
                    falayertext.setAttribute("style", markerTextStyle);
                    falayers.appendChild(falayertext);
                    new mapLibraries.maplibregl.Marker({
                        element: falayers,
                        anchor: "bottom",
                        offset: [0, 5]
                    })
                        .setLngLat([markers[i].data[1], markers[i].data[0]])
                        .addTo(map);
                }
            }
        }
    }
}

export function highlightMarker(markerIndex) {
    if (typeof markerVectorLayer !== "undefined") {
        var featureToHighlight = markerVectorLayer
            .getSource()
            .getFeatureById("marker:" + markerIndex);
        if (featureToHighlight !== null) {
            var featureImage = featureToHighlight.getStyle().getImage();
            if (
                typeof featureImage.iconImage_ !== "undefined" &&
                typeof featureImage.iconImage_.color_ !== "undefined"
            ) {
                featureImage.iconImage_.color_ = [0, 130, 200, 1];
            }
            featureToHighlight.getStyle().setZIndex(1);
        }
    } else {
        var hmarker = document.getElementById("marker-" + markerIndex);
        if (hmarker) {
            hmarker.style.fill = "#0082c8";
            hmarker.parentElement.style.zIndex = 1;
        }
    }
}

export function dehighlightMarker(markerIndex) {
    if (typeof markerVectorLayer !== "undefined") {
        var featureToHighlight = markerVectorLayer
            .getSource()
            .getFeatureById("marker:" + markerIndex);
        if (featureToHighlight !== null) {
            var featureImage = featureToHighlight.getStyle().getImage();
            if (
                typeof featureImage.iconImage_ !== "undefined" &&
                typeof featureImage.iconImage_.color_ !== "undefined"
            ) {
                featureImage.iconImage_.color_ = [161, 28, 37, 1];
            }
            featureToHighlight.getStyle().setZIndex(0);
        }
    } else {
        var hmarker = document.getElementById("marker-" + markerIndex);
        if (hmarker) {
            hmarker.style.fill = "#a11c25";
            hmarker.parentElement.style.zIndex = 0;
        }
    }
}

export function removeMarker(markers, markerIndex) {
    var markerIndex = markerIndex === undefined ? -1 : markerIndex;
    if (markerIndex < 0) {
        markerIndex = 0;
    }
    if (typeof mapLibraries.ol !== "undefined") {
        if (typeof markerVectorLayer !== "undefined") {
            var featureToClose = markerVectorLayer
                .getSource()
                .getFeatureById("marker:" + markerIndex);
            if (featureToClose !== null) {
                markerVectorSource.removeFeature(featureToClose);
            }
        }
        if (typeof markers[markerIndex] !== "undefined") {
            if (typeof markers[markerIndex].data[2] !== "undefined") {
                if (markers[markerIndex].data[2] !== "") {
                    var container = document.getElementById("popup");
                    container.style.display = "none";
                }
            }
        }
    } else {
        var hmarker = document.getElementById("marker-" + markerIndex);
        if (hmarker) {
            var hpopup = document.querySelector(
                ".maplibre-popup.popup-" +
                markerIndex
            );
            if (hpopup) {
                hpopup.remove();
            }
            hmarker.parentElement.remove();
        }
    }
}

export function createMarker(lonLat, name, id, style) {
    var markerFeature = new mapLibraries.ol.Feature({
        geometry: new mapLibraries.ol.geom.Point(mapLibraries.ol.proj.fromLonLat(lonLat)),
        name: name
    });
    var icon = window.btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" style="fill: #fff;display:box;stroke:#fff;stroke-width:15px;filter: drop-shadow(1px 2px 1px rgba(0,0,0,0.4));" width="27px" height="36px" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>'
    );
    var iconSolid = window.btoa(
        '<svg xmlns="http://www.w3.org/2000/svg" style="fill: #fff; display:box;stroke:#fff;stroke-width:15px;filter: drop-shadow(1px 2px 1px rgba(0,0,0,0.4));" width="27px" height="36px" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>'
    );
    markerFeature.setId("marker:" + id);
    if (style == "default") {
        var markerStyle = new mapLibraries.ol.style.Style({
            image: new mapLibraries.ol.style.Icon({
                opacity: 1,
                color: "#a11c25",
                anchor: [0.5, 36],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: "data:image/svg+xml;base64," + icon
            })
        });
        markerFeature.setStyle(markerStyle);
        return markerFeature;
    } else {
        var markerStyle = new mapLibraries.ol.style.Style({
            image: new mapLibraries.ol.style.Icon({
                opacity: 1,
                color: "#a11c25",
                anchor: [0.5, 36],
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: "data:image/svg+xml;base64," + iconSolid
            })
        });
        var markerTextStyle = new mapLibraries.ol.style.Style({
            text: new mapLibraries.ol.style.Text({
                text: (id + 1).toString(),
                fill: new mapLibraries.ol.style.Fill({
                    color: "#fff"
                }),
                stroke: new mapLibraries.ol.style.Stroke({
                    color: "rgba(0,0,0,0.1)",
                    width: 1.5
                }),
                offsetY: -10,
                textBaseline: "bottom",
                textAlign: "center",
                font: 'Normal 700 12px "Open Sans", "Arial", "Verdana", "sans-serif"'
            })
        });
        var markerTextFeature = new mapLibraries.ol.Feature({
            geometry: new mapLibraries.ol.geom.Point(mapLibraries.ol.proj.fromLonLat(lonLat)),
            name: name
        });
        markerTextFeature.setStyle(markerTextStyle);
        markerFeature.setStyle(markerStyle);
        return [markerFeature, markerTextFeature];
    }
}

export function setMarkerOpen(markers, markerIndex) {
    var markerIndex = markerIndex === undefined ? -1 : markerIndex;
    if (typeof mapLibraries.ol !== "undefined") {
        var container = document.getElementById("popup");
        var content = document.getElementById("popup-content");
        //var closer = document.getElementById('popup-closer');
        if (markerIndex < 0) {
            markerIndex = 0;
        }
        container.style.display = "block";
        content.innerHTML = markers[markerIndex].data[2];
        //openlayers throws error on autopan = true.  temporarily catching error for now.
        try {
            markerOverlay.setPosition(
                mapLibraries.ol.proj.fromLonLat([
                    markers[markerIndex].data[1],
                    markers[markerIndex].data[0]
                ])
            );
        } catch (e) { }
    } else {
        var hmarker = document.getElementById("marker-" + markerIndex);
        if (hmarker) {
            hmarker.parentElement.click();
        }
    }
}

export function quickMarkersCenter(markers) {
    var lat = 0,
        lng = 0,
        latAr = [],
        lonAr = [];
    var num_coords = markers.length;
    for (var i = 0; i < num_coords; ++i) {
        lat += Number(markers[i].data[0]);
        lng += Number(markers[i].data[1]);
        latAr.push(markers[i].data[0]);
        lonAr.push(markers[i].data[1]);
    }
    var distance = distanceInKM(
        Math.max.apply(Math, latAr),
        Math.max.apply(Math, lonAr),
        Math.min.apply(Math, latAr),
        Math.min.apply(Math, lonAr)
    );
    var zoom = 13;
    switch (true) {
        case distance < 1:
            zoom = 14;
            break;
        case distance < 4:
            zoom = 13;
            break;
        case distance < 10:
            zoom = 12;
            break;
        case distance < 20:
            zoom = 11;
            break;
        case distance < 40:
            zoom = 10;
            break;
        case distance < 100:
            zoom = 9;
            break;
        case distance < 250:
            zoom = 8;
            break;
        case distance < 400:
            zoom = 7;
            break;
        case distance < 750:
            zoom = 6;
            break;
        case distance < 2000:
            zoom = 5;
            break;
        case distance < 4000:
            zoom = 4;
            break;
        case distance >= 4000:
            zoom = 3;
            break;
        default:
            break;
    }
    lat /= num_coords;
    lng /= num_coords;
    return [lat, lng, zoom];
}