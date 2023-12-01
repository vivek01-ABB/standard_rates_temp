import apux from '@abb-hmi/apux/apux.css?inline';
import '@abb-hmi/apux';
import { tinyHMI } from '@abb-hmi/widget-dev';
// The widgets of this application.
import './main.js';
import widgets from './widgets.json';
import '@abb-hmi/service-context-menu/context-menu.scss';
import { devPanelForTopBarFilter } from './top-bar-filter/dev/dev-panel.tsx';

// Inject APUX styles with an identifier.
const style = document.createElement('style');
style.innerHTML = apux;
style.id = 'apux-style';
document.head.append(style);

// Add additional services here (import devDi from "@abb-hmi/widget-dev")
// devDi.add(...)

// Start the tinyHMI.
// To add additional services import `devDi` from `@abb-hmi/widget-dev`.
tinyHMI(widgets, {
  withWidgetSelector: true,
  devPanel: (tag) => {
    switch (tag) {
      case 'hmi-demo-react-top-bar-filter': {
        return devPanelForTopBarFilter();
      }
      case 'client-page-one': {
        return devPanelForTopBarFilter();
      }

      default:
        return null;
    }
  },
  configuration: {
    'client-page-one': {
      selectedItem: {
        widgetName: 'dev',
        name: 'selectedItem',
      },
    },
    'hmi-demo-react-top-bar-filter': {
      topBar: {
        widgetName: 'dev',
        name: 'topBar',
        transform: {
          kind: 'filter',
          value: ['dogs', 'rats'],
        },
      },
    },
    'hmi-demo-react-top-bar-log': {
      topBar: {
        widgetName: 'dev',
        name: 'topBar',
      },
    },
  },
});
