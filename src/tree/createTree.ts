import { TreeFolder, Input } from "./Tree.types";

type TreeRoot<T extends Record<string, unknown>> = TreeFolder<T>;

export const createTree = <T extends Record<string, unknown>>(
  input: Input<T>[]
): TreeRoot<T> => {
  const root: TreeRoot<T> = {
    path: "",
    name: "",
    files: {},
    branches: {},
  };

  const placeInput = (
    splitPath: string[],
    input: Input<T>,
    folder: TreeFolder<T>
  ) => {
    if (splitPath.length === 1) {
      folder.files[splitPath[0]] = input;
      return;
    }

    if (!folder.branches[splitPath[0]]) {
      folder.branches[splitPath[0]] = {
        path: `${folder.path}/${splitPath[0]}`,
        name: splitPath[0],
        files: {},
        branches: {},
      };
    }
    placeInput(splitPath.slice(1), input, folder.branches[splitPath[0]]);
  };

  input.forEach((input) => {
    const splitPath = input.path.split("/");
    placeInput(splitPath, input, root);
  });

  return root;
};
