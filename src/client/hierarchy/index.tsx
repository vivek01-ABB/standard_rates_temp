import React from 'react';
import { addRootNodeName } from '../utils/HierarchyScope.ts';
import hierarchyData from '../data/hscopeData.ts';
import HierarchyModal from './HierarchyModal.tsx';
import { IItemSelector } from '../../hierarchy-scope/Widget.tsx';
import WidgetVersion from '../WidgetVersion.ts';
import { useConfiguration, useServices } from '../../hierarchy-scope/WidgetContext.ts';

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
  listeners: Set<Parameters<IItemSelector['onNext']>[0]>;
}

const Index: React.FC<ItemsListProps> = ({ listeners }) => {
  const { logger, widget } = useServices();
  const [hierarchyScopes, setHierarchyScope] = React.useState<HierarchyScopeModel[]>();
  const [selectedItem, setSelectedItem] = React.useState<HierarchyScopeModel | null>(null);
  const firstRendering = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (firstRendering.current) {
      // Creating an instance of the IItemSelector that stores the listener
      // in the previous declared storage
      const currentItemCom: IItemSelector = {
        onNext(listener) {
          console.log({ listener });

          listeners?.add(listener);
        },
      };
      // emitting the communication object to the widget and view
      // so other widgets can consume it. This should be called only once.
      console.log({ currentItemCom });

      widget.setCommunicationObject('selectedItem', currentItemCom, {
        name: 'IItemSelector',
        version: WidgetVersion,
      });
    }
    return () => {
      firstRendering.current = false;
    };
  }, [logger, listeners, widget]);

  console.log({ listeners }, widget);

  React.useEffect(() => {
    setHierarchyScope(addRootNodeName(hierarchyData.data as HierarchyScopeModel[]));
  }, []);
  return (
    <div>
      {hierarchyScopes?.length && (
        <HierarchyModal
          dataSource={hierarchyScopes}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};

export default Index;
