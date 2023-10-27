export type ListItem = {
  version: string;
  name: string;
};

export interface IItemSelector {
  onNext: (listener: (value: ListItem | undefined) => void) => void;
}
