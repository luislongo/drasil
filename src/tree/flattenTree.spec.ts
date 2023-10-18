import { describe, expect, it } from "vitest";
import { flattenTree } from "./flattenTree";
import { TreeFolder } from "./Tree.types";
describe("flattenTree", () => {
  it("should flatten a tree", () => {
    const tree: TreeFolder<Record<string, unknown>> = {
      files: {
        "index.ts": {
          path: "index.ts",
        },
      },
      branches: {
        src: {
          files: {
            "createTree.ts": {
              path: "src/createTree.ts",
            },
          },
          branches: {
            tree: {
              files: {
                "flattenTree.ts": {
                  path: "src/tree/flattenTree.ts",
                },
              },
              branches: {},
              name: "tree",
              path: "src/tree/tree",
            },
          },
          name: "src",
          path: "src",
        },
      },
      name: "",
      path: "",
    };

    const flattenedTree = flattenTree(tree);

    expect(flattenedTree[0].name).toBe("src");
    expect(flattenedTree[1].name).toBe("tree");
    expect(flattenedTree[2].name).toBe("flattenTree.ts");
    expect(flattenedTree[3].name).toBe("createTree.ts");
    expect(flattenedTree[4].name).toBe("index.ts");
  });
});
