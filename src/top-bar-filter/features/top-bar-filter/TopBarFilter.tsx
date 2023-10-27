import React, { FC, useEffect, useState } from 'react';
import type { ITopBarCom } from '../../../client/interfaces/index.ts';
import { useConfiguration, useServices } from '../../app/WidgetContext.ts';
import WidgetVersion from '../../../page-one/WidgetVersion.ts';

const TopBarFilter: FC = () => {
  const { topBar, transform } = useConfiguration();
  const { widget } = useServices();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    topBar<ITopBarCom>().then((com) => {
      // Creating the communication relay object.
      const searchListeners: Parameters<ITopBarCom['onSearch']>[0][] = [];
      const abortListeners: Parameters<ITopBarCom['onAbort']>[0][] = [];
      const eraseListeners: Parameters<ITopBarCom['onErase']>[0][] = [];
      const relay: ITopBarCom = {
        onSearch: (listener) => searchListeners.push(listener),
        onAbort: (listener) => abortListeners.push(listener),
        onErase: (listener) => eraseListeners.push(listener),
      };

      setLoading(() => false);

      // Creating mutation from configuration
      const mutate =
        transform.kind === 'upperCase'
          ? (txt: string) => txt.toUpperCase()
          : (() => {
              const loweredFilteredOut = transform.value.map((x) => x.toLocaleLowerCase());
              return (txt: string) =>
                loweredFilteredOut.includes(txt.trim().toLocaleLowerCase()) ? null : txt;
            })();

      // Relying communication and filtering/transforming
      com.onSearch((txt) => {
        const mutated = mutate(txt);
        if (typeof mutated === 'string') {
          console.log(mutated);
          searchListeners.forEach((l) => l(mutated));
        }
      });
      com.onErase(() => eraseListeners.forEach((l) => l()));
      com.onAbort(() => abortListeners.forEach((l) => l()));

      // Registering the relaying object
      widget.setCommunicationObject('topBar', relay, {
        name: 'ITopBarCom',
        version: WidgetVersion,
      });
    });
  }, [topBar, transform, widget]);

  return (
    <div>
      <h4>⚛ Filtering the top bar input.</h4>
      <p>
        This widget <strong>can be hidden</strong> (do not configure it in any layout).
      </p>
      <p>
        It relays the communication from the top bar, but applying some filters or transformations.
      </p>
      {loading ? 'Waiting for the the top bar to load...' : null}
      <strong>
        {transform.kind === 'filter'
          ? `Filtering out: ${transform.value.join(', ')}`
          : 'Transforming to upper case'}
      </strong>
    </div>
  );
};

export default TopBarFilter;
