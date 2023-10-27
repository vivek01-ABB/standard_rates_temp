import { FC } from 'react';
import { ICommunicationHolder, WidgetService } from '@abb-hmi/widget-sdk-react';
import TopBarFilter from './features/top-bar-filter/TopBarFilter.tsx';
import { WidgetContext } from './app/WidgetContext.ts';

export type WidgetProps = {
  services: { widget: WidgetService };
  configuration: {
    topBar: ICommunicationHolder;
    transform:
      | {
          kind: 'upperCase';
          value: unknown;
        }
      | { kind: 'filter'; value: string[] };
  };
};

const Widget: FC<WidgetProps> = (props) => {
  return (
    <WidgetContext.Provider value={props}>
      <TopBarFilter />
    </WidgetContext.Provider>
  );
};

export default Widget;
