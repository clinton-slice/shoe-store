export type Store = {
  id: number;
  name: string;
  address: string;
};

export type Inventory = {
  store: string;
  model: string;
  inventory: number;
};
