import type { ITopBarCom } from '../../client/interfaces/index.ts';
import { devCommunicationExchange, DevPanel } from '@abb-hmi/widget-dev';
import { createTemplate1, createWith } from '@abb-hmi/widget-sdk';
import html from './dev-panel.html?raw';

const panelTemplate = createTemplate1(html);

/** Dev Panel. */
export function devPanelForTopBar(): DevPanel {
  const panel = createWith(panelTemplate, (page) => {
    const searchedTextPre = page.querySelector<HTMLPreElement>('.searched-text')!;
    const lastEvent = page.querySelector<HTMLElement>('.last-event')!;
    const comObject = devCommunicationExchange.getCommunicationObject<ITopBarCom>(
      'hmi-demo-vanilla-top-bar',
      'topBar'
    );
    comObject.then((topBar) => {
      topBar.onSearch((txt) => {
        searchedTextPre.innerText = txt;
        lastEvent.innerText = 'Search';
      });
      topBar.onErase(() => {
        lastEvent.innerText = 'Erase';
      });
      topBar.onAbort(() => {
        lastEvent.innerText = 'Abort';
      });
    });
  });
  return {
    panel,
    side: 'bottom',
    size: 300,
  };
}
