import React from 'react';
import { ToggleButton } from '@abb-hmi/apux-react';
import { INavigator } from '@abb-hmi/widget-sdk-react';
import { IconName } from '@abb-hmi/apux/types';
import { routes, views } from '../../constants/routes.ts';

const SideNav = ({ navigator }: { navigator: INavigator }) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const updateIndex = (event: React.MouseEvent<HTMLElement>) => {
    const index = navItems.map((item) => item.icon).indexOf(event.target.icon);
    setSelectedIndex(index);

    // console.log(
    //   navigator.viewName,
    //   navigator.displayParameters,
    //   navigator.getParameter('key'),
    //   navigator.route
    // );
    // navigator.setParameters({ city: 'toledo' });
    // navigator.navigateTo({
    //   viewName: '/oee/lossmanagement',
    //   parameters: { user: 'some-user' },
    // });

    // navigator.popParameters((prop) => console.log({ prop }));

    navigator.navigateTo({
      viewName: routes[event.target.innerText as keyof typeof routes],
      parameters: { name: 'vivek' },
    });
  };
  const navItems = [
    { icon: 'settings', description: 'OEE configuration' },
    { icon: 'documents', description: 'Loss definitions' },
    { icon: 'list', description: 'Reason Management' },
    { icon: 'matrix', description: 'Equipment Matrix' },
  ];

  return (
    <main className="w-fit">
      <ul onClick={updateIndex}>
        {navItems.map((item, index) => (
          <li key={index} className="h-10">
            <ToggleButton
              icon={item.icon as IconName}
              subVariant="discreet"
              checked={navigator.viewName === views[item.description as keyof typeof views]}
            >
              {item.description}
            </ToggleButton>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SideNav;
