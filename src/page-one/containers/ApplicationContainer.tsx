import React, { FC, useCallback, useRef } from 'react';
import WidgetsVersion from '../WidgetVersion.ts';
import { useServices, useConfiguration } from '../WidgetContext.ts';
import { IItemSelector } from '../../client/interfaces/index.ts';
import { applications } from '../../constants/applications.ts';

export type Application = {
  objectId: string;
  appName: string;
  typeId: string;
  version: string;
  configurationDataEndpoint: string;
  schemaEndpoint: string;
};

export type ApplicationsListContainerProps = {
  applications: Application[];
  onSelectedApplication: (application: Application | undefined) => void;
};

export const ApplicationsListContainer: FC<React.PropsWithChildren<any>> = () => {
  const { view } = useServices();
  const { name, version } = useConfiguration();
  console.log({ name, version });

  const appListRef = useRef<HTMLDivElement>(null);

  //   const { applications, onSelectedApplication } = props;

  const instantiateView = useCallback(() => {
    console.log(appListRef.current);

    // if (appListRef.current) {
    view
      .getCommunicationObject<IItemSelector>('client-hierarchy-scope', 'selectedItem', {
        name: 'IItemSelector',
        version: WidgetsVersion,
      })
      .then((com) => {
        com.onNext((next) => {
          console.log({ next });
        });
      });
    // appListRef.current.append(child.widget as Element);
    // }
  }, []);

  if (!appListRef.current?.childNodes?.length) {
    instantiateView();
  }

  return <div className="appList" data-testid="appList" ref={appListRef} />;
};
