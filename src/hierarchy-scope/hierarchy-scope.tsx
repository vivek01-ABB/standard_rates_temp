import Widget from './Widget.tsx';
import { createWidget, getAuth, getLogger, getWidget } from '@abb-hmi/widget-sdk-react';
import WidgetVersion from '../client/WidgetVersion.ts';

createWidget('client-hierarchy-scope', {
  Component: Widget,
  configuration: {
    apiURL: {
      type: 'string',
      description: 'The base URL of the Web API',
      default: 'https://pokeapi.co/api/v2/',
    },
  },
  services: { getAuth, logger: getLogger('client-hierarchy-scope'), getWidget },
  communicationObjects: {
    selectedItem: { name: 'IItemSelector', version: WidgetVersion },
  },
});
