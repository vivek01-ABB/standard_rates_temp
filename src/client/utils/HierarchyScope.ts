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

const getHierarchyScopeRootNodesNameList = (
  hierarchyNodes: HierarchyScopeModel[],
  hierarchyLevel: string,
  parentNodeId: string,
  rootNodesName: string[]
): string[] => {
  let rootNodeNames: string[] = [];

  if (hierarchyLevel === 'Enterprise' && parentNodeId === null) {
    rootNodeNames = rootNodesName;
  } else {
    const findParentNode = hierarchyNodes.find(
      (hs: HierarchyScopeModel) => hs.uId === parentNodeId
    );

    if (findParentNode !== undefined) {
      rootNodesName.push(findParentNode.name);

      rootNodeNames = getHierarchyScopeRootNodesNameList(
        hierarchyNodes,
        findParentNode.hierarchyLevel,
        findParentNode.parentUId,
        rootNodesName
      );
    }
  }

  return rootNodeNames;
};

const getHierarchyScopeRootNodeNames = (
  hierarchyNode: HierarchyScopeModel,
  hierarchyNodes: HierarchyScopeModel[]
): string => {
  let rootName = '';
  const { hierarchyLevel, parentUId } = hierarchyNode;

  const rootNameList: string[] = getHierarchyScopeRootNodesNameList(
    hierarchyNodes,
    hierarchyLevel,
    parentUId,
    [hierarchyNode.name]
  );

  rootName = rootNameList.reverse().join(' > ');

  return rootName;
};

export const addRootNodeName = (resHierarchyScopeNodes: HierarchyScopeModel[]) => {
  return resHierarchyScopeNodes.map((node: HierarchyScopeModel) => {
    // eslint-disable-next-line no-param-reassign
    node.rootNodesName = getHierarchyScopeRootNodeNames(node, resHierarchyScopeNodes);
    return node;
  });
};

export const mapUIDToData = (ds: Array<HierarchyScopeModel>) => {
  const currentDs = {};

  ds.forEach((ds: HierarchyScopeModel) => {
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

  return currentDs['root'].map((rootItem) => createNestedChildren(currentDs, rootItem));
};

export const createNestedChildren = (datalist: any, root: HierarchyScopeModel) => {
  const { uId: id, name, hierarchyLevel: icon } = root;

  const data = {
    name,
    id,
    icon: icons[icon as keyof typeof icons],
    children: datalist[id as string]?.length
      ? datalist[id as string].map((item: HierarchyScopeModel) =>
          createNestedChildren(datalist, item)
        )
      : [],
  };
  return data;
};
