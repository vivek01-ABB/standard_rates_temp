import React from 'react';
// import { testAuth, testLogger, testView } from '@abb-hmi/widget-test-react-vitest';
import { INavigator } from '@abb-hmi/widget-sdk-react';
import SideNav from './SideNav.tsx';
import '../index.css';

function Index({ navigator }: { navigator: INavigator }) {
  return (
    <React.StrictMode>
      <SideNav navigator={navigator} />
    </React.StrictMode>
  );
}

export default Index;
