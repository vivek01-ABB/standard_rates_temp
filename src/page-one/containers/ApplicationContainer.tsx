import React, { FC } from 'react';
import { Icon } from '@abb-hmi/apux-react';
import { Link, getNavigator } from '@abb-hmi/widget-sdk-react';
import { useConfiguration, useServices } from '../WidgetContext.ts';
import { IItemSelector } from '../../client/interfaces/index.ts';
import { routes, views } from '../../constants/routes.ts';

export const ApplicationsListContainer: FC<React.PropsWithChildren<any>> = () => {
  const [log, setLog] = React.useState('');
  const { name, selectedItem } = useConfiguration();
  const { navigator } = useServices();
  const [loading, setLoading] = React.useState(true);
  console.log({ getNavigator: navigator.viewName });

  React.useEffect(() => {
    selectedItem<IItemSelector>().then((com) => {
      console.log({ comPageOne: com });
      setLoading(() => false);
      com.onNext((txt) => {
        console.log('onnext triggered');

        setLog((p) => `${p}SEARCH:${JSON.stringify(txt)}\n`);
      });
    });
  }, [selectedItem]);

  return (
    <div className="">
      <div
        className={`p-3 float-right ${
          navigator.viewName === views['Page One Standalone'] ? 'hidden' : ''
        } `}
      >
        <Link href={routes['Page One Standalone']}>
          <Icon name="maximize" />
        </Link>
      </div>
      <h4>⚛ Logging events from hierarchy scope.</h4>
      {(name ?? '') !== '' ? <p>{name}</p> : null}
      {loading ? (
        'Waiting for the hierarchyscope to get selected...'
      ) : (
        <pre className="h-10 bg-black w-full overflow-auto p-4 text-white">here:{log}</pre>
      )}
    </div>
  );
};
