import './src/polyfills.js';
import generalFunctions from './index.js';
import { maplibreMap } from './src/maplibreMapFailover.js';
import { openlayersMap } from './src/openlayersFunctions.js';

const slpy = {
    maplibreMap,
    openlayersMap,
    ...generalFunctions
};

export default slpy;