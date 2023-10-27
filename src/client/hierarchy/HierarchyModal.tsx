import React, { SetStateAction } from 'react';
import { TreeView, TreeViewItem } from '@abb-hmi/apux-react';
import { icons } from '../constants/Home.ts';

type HierarchyScopeModel = {
  uId: string | null;
  id: string;
  name: string;
  hierarchyLevel: string;
  description: string;
  parentUId: string;
  rootNodesName?: string;
};

type HierarchyModalProps = {
  dataSource: any;
  setSelectedItem: React.Dispatch<SetStateAction<any>>;
  selectedItem: HierarchyScopeModel;
};

const HierarchyModalGlobal: React.FC<HierarchyModalProps> = ({
  dataSource = [],
  selectedItem,
  setSelectedItem,
}) => {
  const [dataList, setDataList] = React.useState<any>({});
  const [details, setDetails] = React.useState([]);

  const ds = React.useRef(dataSource);

  const onCheckbox = (event: React.ChangeEvent<any>) => {
    event.stopPropagation();

    const data = JSON.parse(event.target.getAttribute('data-item'));

    if (!event.target.selected) return;

    setSelectedItem(event.target.selected ? data : {});
  };

  const BuildMDMTree = (mdmTree: any) => {
    // const isHierarchyMapped = mappedHeirarchy?.includes(mdmTree.mdmTree.uId);
    return (
      <TreeViewItem
        onChange={(e) => console.log(e)}
        open={true}
        text={mdmTree.mdmTree?.name}
        // style={{
        //   pointerEvents: isHierarchyMapped ? 'auto' : 'none',
        //   color: isHierarchyMapped ? 'rgba(31, 31, 31, 1.0)' : 'rgba(31, 31, 31, 0.5)',
        // }}
      >
        <span style={{ display: 'none' }}>{mdmTree.mdmTree?.uId}</span>
        {mdmTree.mdmTree?.children?.map((child: any, index: number) => {
          return <BuildMDMTree mdmTree={child} key={index} />;
        })}
      </TreeViewItem>
    );
  };

  const loopItem = (item: any) => {
    const { uId, name, hierarchyLevel } = item;
    // console.log({ uId, name, hierarchyLevel }, dataList[uId]);

    return dataList[uId as string as keyof typeof dataList] &&
      dataList[uId as string as keyof typeof dataList].length ? (
      <TreeViewItem
        data-item={JSON.stringify(item)}
        open={false}
        text={name}
        key={uId}
        icon={icons[hierarchyLevel]}
      >
        {dataList[uId] && dataList[uId].length && dataList[uId].map((ds: any) => loopItem(ds))}
      </TreeViewItem>
    ) : (
      <TreeViewItem
        text={name}
        key={uId}
        data-item={JSON.stringify(item)}
        icon={icons[hierarchyLevel]}
      ></TreeViewItem>
    );
  };

  React.useEffect(() => {
    const currentDs = {};

    if (ds.current.data) {
      ds.current = ds.current.data;
    }

    ds.current.forEach((ds: { parentUId: string }) => {
      const { parentUId } = ds;
      // child node
      if (parentUId) {
        if (!currentDs[parentUId as keyof typeof currentDs]) {
          currentDs[parentUId] = [];
        }
        currentDs[parentUId].push(ds);
      } else {
        // root node
        if (!currentDs['root' as keyof typeof currentDs]) {
          currentDs['root'] = [];
        }
        currentDs['root'].push(ds);
      }
    });

    /*
datalist={
  pUid:[{ds}],
  pUid:[{ds}],
  root:[{ds with pUid as null}]
} */

    setDataList(currentDs);
  }, []);

  React.useEffect(() => {
    if (dataList['root'] && dataList['root'].length) {
      const details = dataList['root'].map((ds: any) => loopItem(ds));
      setDetails(details);
    }
  }, [dataList, selectedItem]);

  return (
    <main className="">
      <div>
        {dataList['root'] && dataList['root'].length ? (
          <>
            <p className="w-full"></p>
            <div className=" h-full overflow-y-auto overflow-x-hidden ">
              <TreeView
                search={true}
                selection="row"
                onClick={(e: any) => onCheckbox(e)}
                // onChange={(e: any) => onCheckbox(e)}
              >
                {details}
              </TreeView>
            </div>
          </>
        ) : (
          <p className=" flex items-center justify-center ">No data</p>
        )}
      </div>

      {/* <div>
        <IconTextButton disabled={false} value="Close" handleClick={() => setIsOpen(false)} />
      </div> */}
    </main>
  );
};

export default HierarchyModalGlobal;
