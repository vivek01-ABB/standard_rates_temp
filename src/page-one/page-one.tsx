import Widget from './Widget.js';
import {
  createWidget,
  getAuth,
  getLogger,
  getWidget,
  getView,
  getNavigator,
} from '@abb-hmi/widget-sdk-react';
import WidgetVersion from './WidgetVersion.ts';

createWidget('client-page-one', {
  Component: Widget,
  services: {
    logger: getLogger('client-page-one'),
    getView,
    getWidget,
    getAuth,
    navigator: getNavigator,
  },
  configuration: {
    name: {
      type: 'string',
      description: 'name of the application',
      optional: true,
    },

    selectedItem: {
      type: 'communication',
      description: 'The source of the random listItem',
      // objectType is optional, but very recommended
      objectType: {
        name: 'IItemSelector',
        version: WidgetVersion,
      },
    },
  },
});
