import { useStyle } from '@abb-hmi/widget-sdk-react';
import React, { FC } from 'react';
import style from './Widget.css?inline';
import { WidgetContext, WidgetProps } from './WidgetContext.ts';
import { ApplicationsListContainer } from './containers/ApplicationContainer.tsx';

const Widget: FC<React.PropsWithChildren<WidgetProps>> = (props) => {
  useStyle(style);
  return (
    <div className="app">
      <WidgetContext.Provider value={props}>
        <ApplicationsListContainer />
      </WidgetContext.Provider>
    </div>
  );
};

export default Widget;
