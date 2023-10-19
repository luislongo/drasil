import React from "react";
import { TreeRow } from "tree/Tree.types";

export type TreeListProps<T extends Record<string, unknown>> = {
  items: TreeRow<T>[];
};

export const TreeList = <T extends Record<string, unknown>>({
  items,
}: TreeListProps<T>) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.path}>{item.path}</div>
      ))}
    </div>
  );
};
