import React, { FC } from 'react';
import { ICommunicationHolder } from '@abb-hmi/widget-sdk-react';
import TopBarLog from './features/top-bar-log/TopBarLog.tsx';
import { WidgetContext } from './app/WidgetContext.ts';

export type WidgetProps = {
  services: Record<string, unknown>;
  configuration: {
    topBar: ICommunicationHolder;
    explanation: string | undefined;
  };
};

const Widget: FC<WidgetProps> = (props) => {
  return (
    <WidgetContext.Provider value={props}>
      <TopBarLog />
    </WidgetContext.Provider>
  );
};

export default Widget;
