import React from 'react';
import { useStyle, INavigator, ILogger, WidgetService } from '@abb-hmi/widget-sdk-react';
import HierarchyScope from '../client/hierarchy/index.tsx';
import { WidgetContext, WidgetProps } from './WidgetContext.ts';

import style from './Widget.css?inline';

interface MainInterface {
  services: {
    navigator: INavigator;
    widget: WidgetService;
    logger: ILogger;
  };
  configuration: any;
}
export interface IItemSelector {
  onNext: (listener: (value: ListItem | undefined) => void) => void;
}

export type ListItem = {
  id: string;
  name: string;
  metadata: MetadataItem[];
};

export type MetadataItem = {
  key: string;
  value: string;
};

const Widget: React.FC<MainInterface> = (props) => {
  useStyle(style);
  console.log({ props });

  // Creating a storage for the listeners of the event
  const listeners: Set<Parameters<IItemSelector['onNext']>[0]> = new Set();

  return (
    <div className="app h-full bg-grey-100">
      <WidgetContext.Provider value={props}>
        <HierarchyScope listeners={listeners} />
      </WidgetContext.Provider>
    </div>
  );
};

export default Widget;
