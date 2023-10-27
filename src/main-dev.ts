import apux from '@abb-hmi/apux/apux.css?inline';
import '@abb-hmi/apux';
import { tinyHMI } from '@abb-hmi/widget-dev';
// The widgets of this application.
import './main.js';
import widgets from './widgets.json';
import '@abb-hmi/service-context-menu/context-menu.scss';
import { DevPanel } from '@abb-hmi/widget-dev';

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
        // Creating a debugging interface
        // this can be done in an html file, react, or any tool
        const panel = document.createElement('div');
        panel.append('Dev tools for the item list');
        const label = document.createElement('div');
        label.append('Selected item is: ');
        panel.append(label);
        const value = document.createElement('strong');
        label.append(value);
        // Getting the promise of the communication object

        // Returning the panel information
        return {
          // The HTML element
          panel,
          // The location, it can be also "right"
          side: 'bottom',
          // The default size of the panel in pixels
          size: 200,
        };
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
      },
    },
  },
});
