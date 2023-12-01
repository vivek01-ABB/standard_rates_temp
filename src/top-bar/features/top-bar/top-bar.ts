import { ITopBarCom } from '../../../client/interfaces/index.ts';
import {
  cherryPick,
  createTemplate1,
  createWith,
  ILogger,
  WidgetService,
  createEvent,
  FirstParameter,
} from '@abb-hmi/widget-sdk';
import html from './top-bar.html?raw';
const topBarTemplate = createTemplate1(html);

const createTopBarCom = () => {
  // Create the events based on the `createEvent` function provided
  // by the common library.
  const { listen: onSearch, trigger: search } =
    createEvent<FirstParameter<ITopBarCom['onSearch']>>();
  const { listen: onAbort, trigger: abort } = createEvent<FirstParameter<ITopBarCom['onAbort']>>();
  const { listen: onErase, trigger: erase } = createEvent<FirstParameter<ITopBarCom['onErase']>>();
  return { onSearch, search, onAbort, abort, onErase, erase };
};

export const createTopBar = (logger: ILogger, widget: WidgetService) => {
  return createWith(topBarTemplate, (nested) => {
    const form = nested.querySelector<HTMLFormElement>('form')!;
    const erase = nested.querySelector<HTMLDivElement>('.erase')!;
    const abort = nested.querySelector<HTMLDivElement>('.abort')!;
    const topBarCom = createTopBarCom();

    form.onsubmit = (ev) => {
      ev.preventDefault();
      const data = new FormData(ev.currentTarget as HTMLFormElement);
      // By calling this function, the event will be triggered.
      topBarCom.search((data.get('text') as string) ?? '');
    };

    // Call the erase and abort when needed.
    erase.onclick = () => topBarCom.erase();
    abort.onclick = () => topBarCom.abort();

    // Make the communication object available for other widgets
    // to consume it, the other widgets most likely are waiting
    // for it or even blocked.
    widget.setCommunicationObject<ITopBarCom>(
      'topBar',
      cherryPick(topBarCom, 'onSearch', 'onAbort', 'onErase'),
      { name: 'ITopBarCom', version: '0.0.0' }
    );
  });
};
