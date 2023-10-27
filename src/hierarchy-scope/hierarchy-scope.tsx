import { createWidget, getLogger, getWidget, getView, getAuth } from '@abb-hmi/widget-sdk-react';
import WidgetVersion from '../client/WidgetVersion.ts';
import Widget from './Widget.tsx';

createWidget('client-hierarchy-scope', {
  Component: Widget,
  services: { logger: getLogger('client-hierarchy-scope'), getWidget, getView, getAuth },
  configuration: {
    apiURL: {
      type: 'string',
      description: 'The base URL of the Web API',
      default: 'https://pokeapi.co/api/v2/',
    },
  },
  selectedItem: {
    type: 'communication',
    description: 'selected item',
    objectType: { name: 'IItemSelector', version: WidgetVersion },
  },
  communicationObjects: {
    selectedItem: { name: 'IItemSelector', version: WidgetVersion },
  },
});
