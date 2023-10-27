import Widget from './Widget.js';
import { createWidget, getAuth, getLogger, getWidget, getView } from '@abb-hmi/widget-sdk-react';
import WidgetVersion from './WidgetVersion.ts';

createWidget('client-page-one', {
  Component: Widget,
  services: {
    logger: getLogger('client-page-one'),
    getView,
    getWidget,
    getAuth,
  },
  configuration: {
    // name: {
    //   type: 'string',
    //   description: 'name of the application',
    //   optional: false,
    //   default: 'demo-app',
    // },
    // version: {
    //   type: 'string',
    //   description: 'version of the application',
    //   optional: false,
    //   default: '0.0.1',
    // },

    selectedItem: {
      type: 'communication',
      description: 'The source of the random listItem',
      // objectType is optional, but very recommended
      objectType: {
        name: 'IItemSelector',
        version: typeof WidgetVersion,
      },
    },
  },
});
