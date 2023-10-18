import { TreeFolder, TreeRow } from "./Tree.types";

export const flattenTree = <T extends Record<string, unknown>>(
  root: TreeFolder<T>
): TreeRow<T>[] => {
  const flattenFolder = (
    folder: TreeFolder<T>,
    path: string,
    acc: TreeRow<T>[]
  ) => {
    const foldersInFolder = Object.values(folder.branches);
    const filesInFolder = Object.values(folder.files);

    const foldersInFolderAsRows: TreeRow<T>[] = foldersInFolder.map(
      (folder) => ({
        name: folder.name,
        path: `${path}/${folder.name}`,
        type: "folder" as const,
        payload: folder,
      })
    );

    const filesInFolderAsRows: TreeRow<T>[] = filesInFolder.map((file) => ({
      name: file.path.split("/").pop() as string,
      path: `${path}/${file.path.split("/").pop()}`,
      type: "file" as const,
      payload: file,
    }));

    Object.values(folder.branches).forEach((branch, id) => {
      acc.push(foldersInFolderAsRows[id]);
      flattenFolder(branch, `${path}/${branch.name}`, acc);
    });

    acc.push(...filesInFolderAsRows);
    return acc;
  };

  return flattenFolder(root, "", []);
};
