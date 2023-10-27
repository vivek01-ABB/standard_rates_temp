import WidgetVersion from '../page-one/WidgetVersion.ts';
import Widget from './Widget.tsx';
import { createWidget, getWidget } from '@abb-hmi/widget-sdk-react';

createWidget('hmi-demo-react-top-bar-filter', {
  Component: Widget,
  services: { getWidget },
  configuration: {
    transform: {
      type: 'either',
      description: 'The filtering options',
      options: {
        upperCase: {
          type: 'any',
          description: 'Convert the input to upper case',
        },
        filter: {
          type: 'list',
          description: 'Phrase to filter out',
          element: { type: 'string', description: 'A phrase to filter out' },
        },
      },
    },
    topBar: {
      type: 'communication',
      description: 'The top bar element to plug',
      objectType: { name: 'ITopBarCom', version: WidgetVersion },
    },
  },
  communicationObjects: {
    topBar: { name: 'ITopBarCom', version: WidgetVersion },
  },
});
