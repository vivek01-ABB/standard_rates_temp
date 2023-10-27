import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ITopBarCom } from '../../client/interfaces/index.ts';
import { devCommunicationExchange, DevPanel } from '@abb-hmi/widget-dev';
import { Button, Input } from '@abb-hmi/apux-react';
import WidgetVersion from '../../page-one/WidgetVersion.ts';
import { createRoot } from 'react-dom/client';

// Produce communication object (it is ok to be singleton in dev)
const searchListeners: Parameters<ITopBarCom['onSearch']>[0][] = [];
const abortListeners: Parameters<ITopBarCom['onAbort']>[0][] = [];
const eraseListeners: Parameters<ITopBarCom['onErase']>[0][] = [];
const com: ITopBarCom = {
  onSearch: (listener) => searchListeners.push(listener),
  onAbort: (listener) => abortListeners.push(listener),
  onErase: (listener) => eraseListeners.push(listener),
};

export const Panel: FC = () => {
  // Handle submit of form (text and search button)
  const formSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('text');
    searchListeners.forEach((l) => l((name as string | undefined) ?? ''));
  }, []);

  // Handle the other 2 buttons
  const eraseEvent = useCallback(() => {
    eraseListeners.forEach((l) => l());
  }, []);

  const abortEvent = useCallback(() => {
    abortListeners.forEach((l) => l());
  }, []);

  // Send the com object
  useEffect(() => {
    devCommunicationExchange.setCommunicationObject('dev', 'topBar', com, {
      name: 'ITopBarCom',
      version: WidgetVersion,
    });
  }, []);

  // Receive the relayed object
  const [searched, setSearched] = useState('');
  const [lastEvent, setLastEvent] = useState('');
  useEffect(() => {
    const promisedRelay = devCommunicationExchange.getCommunicationObject<ITopBarCom>(
      'hmi-demo-react-top-bar-filter',
      'topBar'
    );
    promisedRelay.then((relay) => {
      relay.onSearch((txt) => {
        setSearched(() => txt);
        setLastEvent(() => 'Search');
      });
      relay.onAbort(() => setLastEvent(() => 'Abort'));
      relay.onErase(() => setLastEvent(() => 'Erase'));
    });
  }, []);

  return (
    <div>
      <h5>Task list dev panel</h5>
      <p>This helpers allows to emulate the top bar and spy on the relayed events</p>
      <h6>Input</h6>
      <form onSubmit={formSubmit}>
        <Input name="text" placeholder="Text to search" crossOrigin={undefined} />
        <Button variant="primary">Search</Button>
      </form>
      <Button variant="accent" onClick={eraseEvent}>
        Erase
      </Button>
      <Button variant="discreet" onClick={abortEvent}>
        Abort
      </Button>
      <div>
        <h6>Output</h6>
        <pre>{searched}</pre>
        <p>
          Last event: <strong>{lastEvent}</strong>
        </p>
      </div>
    </div>
  );
};

// /** Dev Panel. */
// export function devPanelForTopBarFilter(): DevPanel {
//   const panel = document.createElement('div');
//   createRoot(<Panel />, panel);
//   return {
//     panel,
//     side: 'bottom',
//     size: 380,
//   };
// }
