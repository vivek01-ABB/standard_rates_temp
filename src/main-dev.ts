import apux from '@abb-hmi/apux/apux.css?inline';
import '@abb-hmi/apux';
import { tinyHMI } from '@abb-hmi/widget-dev';
// The widgets of this application.
import './main.js';
import widgets from './widgets.json';
import '@abb-hmi/service-context-menu/context-menu.scss';

// Inject APUX styles with an identifier.
const style = document.createElement('style');
style.innerHTML = apux;
style.id = 'apux-style';
document.head.append(style);

// Add additional services here (import devDi from "@abb-hmi/widget-dev")
// devDi.add(...)

// Start the tinyHMI.
// To add additional services import `devDi` from `@abb-hmi/widget-dev`.
tinyHMI(widgets, { withWidgetSelector: true });
