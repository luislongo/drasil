export type Input<T extends Record<string, unknown>> = {
  path: string;
} & T;

export type TreeFile<T extends Record<string, unknown>> = {
  path: string;
} & T;

export type TreeFolder<T extends Record<string, unknown>> = {
  name: string;
  path: string;
  files: Record<string, TreeFile<T>>;
  branches: Record<string, TreeFolder<T>>;
};

export type TreeRow<T extends Record<string, unknown>> = {
  name: string;
  path: string;
  type: "file" | "folder";
  payload: TreeFile<T> | TreeFolder<T>;
};
