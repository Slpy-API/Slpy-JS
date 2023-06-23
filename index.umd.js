import generalFunctions from './index.js';
import { maplibreMap } from './src/maplibreMap.js';
import { openlayersMap } from './src/openlayersFunctions';

const slpy = {
  maplibreMap,
  openlayersMap,
  ...generalFunctions
};

export default slpy;