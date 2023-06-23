import generalFunctions from './index.js';
import { openlayersMap  } from './src/openlayersFunctions';

const slpy = {
    openlayersMap,
    ...generalFunctions
  };

export {
    slpy,
    generalFunctions,
    openlayersMap
  };