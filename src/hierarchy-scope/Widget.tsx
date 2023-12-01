import React, { FC } from 'react';
import { useStyle } from '@abb-hmi/widget-sdk-react';
import { IItemSelector } from '../client/interfaces/index.ts';
import HierarchyScope from '../client/hierarchy/index.tsx';
import { WidgetContext, WidgetProps } from './WidgetContext.ts';
import style from './Widget.css?inline';

const Widget: FC<React.PropsWithChildren<WidgetProps>> = (props) => {
  useStyle(style);
  const searchListeners: Parameters<IItemSelector['onNext']>[0][] = [];
  return (
    <div className="app h-full bg-grey-100">
      <WidgetContext.Provider value={props}>
        <HierarchyScope searchListeners={searchListeners} />
      </WidgetContext.Provider>
    </div>
  );
};

export default Widget;
