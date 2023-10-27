import {
  createWidgetContext,
  IAuth,
  ILogger,
  IPublicView,
  WidgetService,
} from '@abb-hmi/widget-sdk-react';

export type ListItem = {
  version: string;
  name: string;
};

export type WidgetProps = {
  services: { logger: ILogger; view: IPublicView; auth: IAuth; widget: WidgetService };
  configuration: { name: string; version: string };
};

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
