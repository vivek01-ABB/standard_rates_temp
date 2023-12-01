import { FC, FormEvent, useCallback, useEffect } from 'react';
import { devCommunicationExchange, DevPanel } from '@abb-hmi/widget-dev';
import { Button, Input } from '@abb-hmi/apux-react';
import { createRoot } from 'react-dom/client';
import { ITopBarCom } from '../../client/interfaces/index.ts';
import WidgetVersion from '../../page-one/WidgetVersion.ts';

// Produce communication object (it is ok to be singleton in dev)
const searchListeners: Parameters<ITopBarCom['onSearch']>[0][] = [];
const abortListeners: Parameters<ITopBarCom['onAbort']>[0][] = [];
const eraseListeners: Parameters<ITopBarCom['onErase']>[0][] = [];
const com: ITopBarCom = {
  onSearch: (listener) => searchListeners.push(listener),
  onAbort: (listener) => abortListeners.push(listener),
  onErase: (listener) => eraseListeners.push(listener),
};

const Panel: FC = () => {
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

  return (
    <div>
      <h5>Task list dev panel</h5>
      <p>This helper allows to spy the communication emitted by the top bar to other widgets</p>
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
    </div>
  );
};

// /** Dev Panel. */
export function devPanelForTopBarFilter(): DevPanel {
  const panel = document.createElement('div');
  const root = createRoot(panel);
  root.render(<Panel />);
  return {
    panel,
    side: 'bottom',
    size: 380,
  };
}
