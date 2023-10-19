import React from "react";
import { Input } from "./tree/Tree.types";
import { createTree } from "./tree/createTree";
import { flattenTree } from "./tree/flattenTree";
import { TreeList } from "./components/TreeList/TreeList";

const inputMock: Input<Record<string, unknown>>[] = [
  {
    path: "fileA.ts",
  },
  {
    path: "fileB.ts",
  },
  {
    path: "folderA/fileC.ts",
  },
  {
    path: "folderA/fileD.ts",
  },
  {
    path: "folderB/fileE.ts",
  },
  {
    path: "folderB/fileF.ts",
  },
];

export const App = () => {
  const rows = flattenTree(createTree(inputMock));
  return (
    <div>
      <TreeList items={rows} />
    </div>
  );
};
