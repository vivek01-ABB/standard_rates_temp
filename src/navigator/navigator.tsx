import Widget from './Widget.js';
import { createWidget, getAuth, getNavigator, getOverlay } from '@abb-hmi/widget-sdk-react';

createWidget('client-navigator', {
  Component: Widget,
  configuration: {
    apiURL: {
      type: 'string',
      description: 'The base URL of the Web API',
      default: 'https://pokeapi.co/api/v2/',
    },
    // the required view name as required
    // reportViewName: {
    //   type: 'string',
    //   description: 'client-navigator-app',
    // },
  },

  services: { getAuth, getNavigator },
  // options: { adaptive: { lg: 200, md: 200, sm: 200 } },
  options: { adaptive: true },
  communicationObjects: {
    randomNumber: {
      name: 'IRandomGenerator',
      version: '1',
    },
  },
});
