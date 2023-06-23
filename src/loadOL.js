import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as olcondef, Control } from 'ol/control'
import { defaults as olintdef } from 'ol/interaction'
import { fromLonLat } from 'ol/proj'
import { VectorTile as vecLayer, Tile } from 'ol/layer'
import { VectorTile as vecSource, XYZ } from 'ol/source'
import { MVT } from 'ol/format'
import { boundingExtent, containsCoordinate } from 'ol/extent'

export function loadOpenLayers() {
    let ol = {};
    if (typeof window !== "undefined" && typeof window.ol !== "undefined") {
        return window.ol;
    } else {
        try {
            ol = {
                Map,
                control: { defaults: olcondef, Control },
                extent: { boundingExtent, containsCoordinate },
                interaction: { defaults: olintdef },
                proj: { fromLonLat },
                View,
                layer: { VectorTile: vecLayer, Tile },
                source: { VectorTile: vecSource, XYZ },
                format: { MVT }
            };
        } catch (e) {
            console.log(e);
            console.log("Slpy JS: 'ol' could not be found. Make sure https://github.com/openlayers/openlayers  is installed and/or the script has been run before this function.");
        }
    }
    return ol;
}