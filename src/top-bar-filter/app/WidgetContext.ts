import { createWidgetContext } from '@abb-hmi/widget-sdk-react';
import type { WidgetProps } from '../Widget.tsx';

export const { WidgetContext, useConfiguration, useServices } = createWidgetContext<WidgetProps>();
