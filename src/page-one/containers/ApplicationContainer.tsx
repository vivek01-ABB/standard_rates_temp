import React, { FC, useCallback, useRef } from 'react';
import WidgetsVersion from '../WidgetVersion.ts';
import { useServices } from '../WidgetContext.ts';
import { applications } from '../../constants/applications.ts';

export type Application = {
  objectId: string;
  appName: string;
  typeId: string;
  version: string;
  configurationDataEndpoint: string;
  schemaEndpoint: string;
};

export type ListItem = {
  id: string;
  name: string;
  metadata: MetadataItem[];
};

export type MetadataItem = {
  key: string;
  value: string;
};

export interface IItemSelector {
  onNext: (listener: (value: ListItem | undefined) => void) => void;
}

export type ApplicationsListContainerProps = {
  applications: Application[];
  onSelectedApplication: (application: Application | undefined) => void;
};

export const ApplicationsListContainer: FC<React.PropsWithChildren<any>> = () => {
  const { view, logger } = useServices();
  const appListRef = useRef<HTMLDivElement>(null);

  //   const { applications, onSelectedApplication } = props;

  const instantiateView = useCallback(() => {
    view
      .instantiateWidget({
        tag: 'client-page-one-items-list-widget',
        configuration: {
          items: applications.map<ListItem>((item) => ({
            id: item.objectId,
            name: item.appName,
            metadata: [
              {
                key: 'typeId',
                value: item.typeId,
              },
              {
                key: 'version',
                value: item.version,
              },
            ],
          })),
        },
      })
      .then((child) => {
        if (appListRef.current) {
          view
            .getCommunicationObject<IItemSelector>(child.name, 'selectedItem', {
              name: 'IItemSelector',
              version: WidgetsVersion,
            })
            .then((com) => {
              com.onNext((next) => {
                console.log({ next }, { child });
              });
            });
          appListRef.current.append(child.widget as Element);
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  }, []);

  if (!appListRef.current?.childNodes?.length) {
    instantiateView();
  }

  return <div className="appList" data-testid="appList" ref={appListRef} />;
};
