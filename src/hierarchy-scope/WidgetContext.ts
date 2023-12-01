import {
  createWidgetContext,
  ILogger,
  IPublicView,
  WidgetService,
  IAuth,
  ICommunicationHolder,
  INavigator,
} from '@abb-hmi/widget-sdk-react';

export type WidgetProps = {
  services: {
    logger: ILogger;
    view: IPublicView;
    widget: WidgetService;
    auth: IAuth;
    navigator: INavigator;
  };
  configuration: { name: string; selectedItem: ICommunicationHolder };
};

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
