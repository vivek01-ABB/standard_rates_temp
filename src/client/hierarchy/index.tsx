import React from 'react';
import { createEvent, FirstParameter } from '@abb-hmi/widget-sdk-react';
import { addRootNodeName } from '../utils/HierarchyScope.ts';
import hierarchyData from '../data/hscopeData.ts';
import HierarchyModal from './HierarchyModal.tsx';
import { IItemSelector } from '../interfaces/index.ts';
import WidgetVersion from '../WidgetVersion.ts';
import { useServices, useConfiguration } from '../../hierarchy-scope/WidgetContext.ts';

type HierarchyScopeModel = {
  uId: string | null;
  id: string;
  name: string;
  hierarchyLevel: string;
  description: string;
  parentUId: string;
  rootNodesName?: string;
};

// interface ItemsListProps {
//   listeners: Set<Parameters<IItemSelector['onNext']>[0]>;
// }

const Index: React.FC = () => {
  const { widget } = useServices();
  const { selectedItem } = useConfiguration();
  const [hierarchyScopes, setHierarchyScope] = React.useState<HierarchyScopeModel[]>();
  const [selectedItemLocal, setSelectedItemLocal] = React.useState<HierarchyScopeModel>(
    {} as HierarchyScopeModel
  );
  const firstRendering = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (firstRendering.current) {
      // Creating an instance of the IItemSelector that stores the listener
      // in the previous declared storage

      const { listen: onNext, trigger } = createEvent<FirstParameter<IItemSelector['onNext']>>();
      // selectedItem<IItemSelector>().then((com) => {
      //   console.log(com);
      // });
      // const currentItemCom: IItemSelector = {
      //   onNext(listener) {
      //     console.log({ listener });

      //     listeners?.add(listener);
      //   },
      // };

      const currentItemCom: IItemSelector = { onNext };

      // emitting the communication object to the widget and view
      // so other widgets can consume it. This should be called only once.

      // this function will trigger the event
      trigger({ name: 'event', version: '2.1.1' });

      widget.setCommunicationObject('selectedItem', currentItemCom, {
        name: 'IItemSelector',
        version: WidgetVersion,
      });
      console.log({ widget });
    }
    return () => {
      firstRendering.current = false;
    };
  }, []);

  React.useEffect(() => {
    setHierarchyScope(addRootNodeName(hierarchyData.data as HierarchyScopeModel[]));
  }, []);
  return (
    <div>
      {hierarchyScopes?.length && (
        <HierarchyModal
          dataSource={hierarchyScopes}
          selectedItem={selectedItemLocal}
          setSelectedItem={setSelectedItemLocal}
        />
      )}
    </div>
  );
};

export default Index;
