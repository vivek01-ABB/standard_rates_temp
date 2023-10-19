import { createWidgetContext, IAuth, ILogger, IPublicView } from '@abb-hmi/widget-sdk-react';

export type ListItem = {
  id: string;
  name: string;
  metadata: MetadataItem[];
};

export type MetadataItem = {
  key: string;
  value: string;
};

export type WidgetProps = {
  services: { logger: ILogger; view: IPublicView; auth: IAuth };
  configuration: { apiUrl: string };
};

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
