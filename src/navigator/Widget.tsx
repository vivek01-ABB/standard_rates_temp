import React from 'react';
import { useStyle, INavigator } from '@abb-hmi/widget-sdk-react';
import Index from '../client/navigation/main.tsx';
import style from './Widget.css?inline';

interface MainInterface {
  services: {
    navigator: INavigator;
  };
}

const Widget: React.FC<MainInterface> = (props) => {
  // const { overlay } = useServices();

  // console.log(overlay);

  useStyle(style);

  // console.log(props.services.navigator.navigateTo({ path: '/vivek' }))
  // console.log({ props });

  const handleClick = () => {};

  return (
    <div className="app h-full bg-grey-100">
      <Index navigator={props.services.navigator} />
      <button onClick={handleClick}>open dialog</button>
    </div>
  );
};

export default Widget;
