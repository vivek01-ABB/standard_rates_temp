import React, { FC } from 'react';
import { useStyle } from '@abb-hmi/widget-sdk-react';
import HierarchyScope from '../client/hierarchy/index.tsx';
import { WidgetContext, WidgetProps } from './WidgetContext.ts';
import style from './Widget.css?inline';

const Widget: FC<React.PropsWithChildren<WidgetProps>> = (props) => {
  useStyle(style);

  return (
    <div className="app h-full bg-grey-100">
      <WidgetContext.Provider value={props}>
        <HierarchyScope />
      </WidgetContext.Provider>
    </div>
  );
};

export default Widget;
