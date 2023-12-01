import React from 'react';
import { Link } from '@abb-hmi/widget-sdk-react';
import { Icon } from '@abb-hmi/apux-react';
import { addRootNodeName } from '../utils/HierarchyScope.ts';
import hierarchyData from '../data/hscopeData.ts';
import HierarchyModal from './HierarchyModal.tsx';
import { IItemSelector } from '../interfaces/index.ts';
import WidgetVersion from '../WidgetVersion.ts';
import { useServices, useConfiguration } from '../../hierarchy-scope/WidgetContext.ts';
import { routes, views } from '../../constants/routes.ts';

type HierarchyScopeModel = {
  uId: string | null;
  id: string;
  name: string;
  hierarchyLevel: string;
  description: string;
  parentUId: string;
  rootNodesName?: string;
};

interface ItemsListProps {
  searchListeners: Parameters<IItemSelector['onNext']>[0][];
}

const Index: React.FC<ItemsListProps> = ({ searchListeners }) => {
  console.log({ searchListeners });

  const { widget, logger, navigator, auth, view } = useServices();
  const { selectedItem, name } = useConfiguration();
  const [hierarchyScopes, setHierarchyScope] = React.useState<HierarchyScopeModel[]>();
  const [selectedItemLocal, setSelectedItemLocal] = React.useState<{
    name: string;
    version: string;
  }>({ name: '', version: '' });
  const firstRendering = React.useRef<boolean>(true);
  // const { listen: onNext, trigger: next } = createEvent<FirstParameter<IItemSelector['onNext']>>();

  // const currentItemCom = { onNext, next };
  React.useEffect(() => {
    const currentItemCom: IItemSelector = {
      onNext: (listener) => {
        searchListeners.push(listener);
      },
    };
    if (firstRendering.current) {
      // Creating an instance of the IItemSelector that stores the listener
      // in the previous declared storage

      // emitting the communication object to the widget and view
      // so other widgets can consume it. This should be called only once.
      widget.setCommunicationObject('selectedItem', currentItemCom, {
        name: 'IItemSelector',
        version: WidgetVersion,
      });
    }
    return () => {
      firstRendering.current = false;
    };
  }, [widget, logger, selectedItem, name]);

  console.log({ widget, logger, navigator, auth, view });

  React.useEffect(() => {
    setHierarchyScope(addRootNodeName(hierarchyData.data as HierarchyScopeModel[]));
  }, []);

  const onCheckbox = (event: React.ChangeEvent<any>) => {
    event.stopPropagation();

    const data = JSON.parse(event.target.getAttribute('data-item'));

    if (!event.target.selected) return;

    setSelectedItemLocal(
      event.target.selected
        ? {
            name: data?.name as string,
            version: WidgetVersion,
          }
        : { name: '', version: '' }
    );
    if (data?.name) {
      searchListeners?.forEach((l: any) =>
        l({
          name: data.name as string,
          version: WidgetVersion,
        })
      );
    }
  };

  return (
    <div>
      <div
        className={`p-3 float-right ${
          navigator.viewName === views['Hierarchy Standalone'] ? 'hidden' : ''
        } `}
      >
        <Link href={routes['Hierarchy Standalone']}>
          <Icon name="maximize" />
        </Link>
      </div>
      {hierarchyScopes?.length && (
        <HierarchyModal
          dataSource={hierarchyScopes}
          selectedItem={selectedItemLocal}
          setSelectedItem={setSelectedItemLocal}
          onCheckbox={onCheckbox}
        />
      )}
    </div>
  );
};

export default Index;
