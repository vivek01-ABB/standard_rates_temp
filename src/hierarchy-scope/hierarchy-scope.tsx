import {
  createWidget,
  getLogger,
  getWidget,
  getView,
  getAuth,
  getNavigator,
} from '@abb-hmi/widget-sdk-react';
import WidgetVersion from '../client/WidgetVersion.ts';
import Widget from './Widget.tsx';

createWidget('client-hierarchy-scope', {
  Component: Widget,
  services: {
    logger: getLogger('client-hierarchy-scope'),
    getWidget,
    getView,
    getAuth,
    navigator: getNavigator,
  },

  communicationObjects: {
    selectedItem: { name: 'IItemSelector', version: WidgetVersion },
  },
});
