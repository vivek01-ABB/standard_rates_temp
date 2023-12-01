import { FC, useEffect, useState } from 'react';
import { useConfiguration } from '../../app/WidgetContext.ts';
import { ITopBarCom } from '../../../client/interfaces/index.ts';

const TopBarLog: FC = () => {
  const { topBar, explanation } = useConfiguration();
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState('');
  console.log({ topBar }, { explanation });

  useEffect(() => {
    topBar<ITopBarCom>().then((com) => {
      console.log({ comTopBar: com });

      setLoading(() => false);
      com.onSearch((txt) => {
        console.log('onsearch triggered');

        setLog((p) => `${p}SEARCH:${txt}\n`);
      });
      com.onErase(() => {
        setLog((p) => `${p}ERASE\n`);
      });
      com.onAbort(() => {
        setLog((p) => `${p}ABORT\n`);
      });
    });
  }, [topBar]);
  return (
    <div>
      <h4>⚛ Logging events from the top bar.</h4>
      {(explanation ?? '') !== '' ? <p>{explanation}</p> : null}
      {loading ? 'Waiting for the the top bar to load...' : <pre>{log}</pre>}
    </div>
  );
};

export default TopBarLog;
