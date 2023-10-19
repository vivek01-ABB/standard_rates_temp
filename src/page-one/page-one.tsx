import Widget from './Widget.js';
import { createWidget, getAuth } from '@abb-hmi/widget-sdk-react';

createWidget('client-page-one', {
  Component: Widget,
  configuration: {
    apiURL: {
      type: 'string',
      description: 'The base URL of the Web API',
      default: 'https://pokeapi.co/api/v2/',
    },
  },
  services: { getAuth },
});
