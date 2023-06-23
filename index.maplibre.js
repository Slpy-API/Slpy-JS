import generalFunctions from './index.js';
import { maplibreMap } from './src/maplibreMap.js';

const slpy = {
    maplibreMap,
    ...generalFunctions
  };

export {
    slpy,
    generalFunctions,
    maplibreMap
  };