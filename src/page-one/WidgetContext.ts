import {
  createWidgetContext,
  IAuth,
  ICommunicationHolder,
  ILogger,
  IPublicView,
  WidgetService,
  INavigator,
} from '@abb-hmi/widget-sdk-react';

export type WidgetProps = {
  services: {
    logger: ILogger;
    view: IPublicView;
    auth: IAuth;
    widget: WidgetService;
    navigator: INavigator;
  };
  configuration: { name: string; selectedItem: ICommunicationHolder };
};

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
