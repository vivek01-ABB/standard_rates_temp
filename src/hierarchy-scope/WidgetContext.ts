import {
  createWidgetContext,
  ILogger,
  IPublicView,
  WidgetService,
  IAuth,
  ICommunicationHolder,
} from '@abb-hmi/widget-sdk-react';

export type WidgetProps = {
  services: { logger: ILogger; view: IPublicView; widget: WidgetService; auth: IAuth };
  configuration: { selectedItem: ICommunicationHolder; apiUrl: string };
};

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
