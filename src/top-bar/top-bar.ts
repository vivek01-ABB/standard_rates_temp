import { createWidget, getLogger, getWidget } from '@abb-hmi/widget-sdk';
import { createTopBar } from './features/top-bar/top-bar.ts';
import styles from './index.scss?inline';

createWidget('hmi-demo-vanilla-top-bar', {
  constructor: async ({ logger, widget }) => {
    return {
      element: createTopBar(logger, widget),
      styles: [styles],
    };
  },
  services: { getLogger, getWidget },
  communicationObjects: {
    topBar: { name: 'ITopBarCom', version: '0.0.0' },
  },
});
