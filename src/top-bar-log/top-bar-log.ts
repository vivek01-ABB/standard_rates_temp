import WidgetVersion from '../client/WidgetVersion.ts';
import Widget from './Widget.tsx';
import { createWidget } from '@abb-hmi/widget-sdk-react';

createWidget('hmi-demo-react-top-bar-log', {
  Component: Widget,
  configuration: {
    explanation: {
      type: 'string',
      description: 'Some words to explain the purpose',
      optional: true,
    },
    topBar: {
      type: 'communication',
      description: 'The top bar element to plug',
      objectType: { name: 'ITopBarCom', version: WidgetVersion },
    },
  },
});
