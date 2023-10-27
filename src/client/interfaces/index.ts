export type ListItem = {
  version: string;
  name: string;
};

export interface IItemSelector {
  onNext: (listener: (value: ListItem | undefined) => void) => void;
}

export interface ITopBarCom {
  onSearch: (listener: (txt: string) => void) => void;
  onErase: (listener: () => void) => void;
  onAbort: (listener: () => void) => void;
}

export interface ITopBarCom {
  onSearch: (listener: (txt: string) => void) => void;
  onErase: (listener: () => void) => void;
  onAbort: (listener: () => void) => void;
}
