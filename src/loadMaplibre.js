//import {Map, AttributionControl, NavigationControl, LngLatBounds, setRTLTextPlugin} from 'maplibre-gl'
//maplibregl does not currently support treeshaking, so we will import the entire library for now.
import maplibregl from 'maplibre-gl'

export function loadMaplibre ()  {
    let maplibregls = {};
    if (typeof window !== "undefined" && typeof window.maplibregl !== "undefined") {
        return window.maplibregl;
    } else {
        try {
            maplibregls = {
                ...maplibregl
            };
        } catch (e) {
            console.log(e);
            console.log("Slpy JS: 'maplibre' could not be found. Make sure https://github.com/maplibre/maplibre-gl-js  is installed and/or the script has been run before this function.");
        }
    }
    return maplibregls;
}