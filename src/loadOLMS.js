import { apply } from 'ol-mapbox-style'

export function loadOLMS() {
    let olms = {};
    if (typeof window !== "undefined" && typeof window.olms !== "undefined") {
        return window.olms;
    } else {
        try {
            olms = { apply };
        } catch (e) {
            console.log(e);
            console.log("Slpy JS: 'olms' could not be found. Make sure https://github.com/openlayers/ol-mapbox-style  is installed and/or the script has been run before this function.");
        }
    }
    return olms;
}