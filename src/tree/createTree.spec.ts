import { describe, expect, it } from "vitest";
import { createTree } from "./createTree";

describe("createFileTree", () => {
  it("should create a file tree", () => {
    const input = [
      {
        path: "index.ts",
      },
      {
        path: "createTree.ts",
      },
      {
        path: "createTree.spec.ts",
      },
    ];

    const tree = createTree(input);

    expect(tree.files["index.ts"]).toBeDefined();
    expect(tree.files["createTree.ts"]).toBeDefined();
    expect(tree.files["createTree.spec.ts"]).toBeDefined();
  });

  it("should create a file tree with nested folders", () => {
    const input = [
      {
        path: "index.ts",
      },
      {
        path: "src/createTree.ts",
      },
      {
        path: "src/createTree.spec.ts",
      },
    ];

    const tree = createTree(input);

    console.log(JSON.stringify(tree));

    expect(tree.files["index.ts"]).toBeDefined();
    expect(tree.branches["src"]).toBeDefined();
    expect(tree.branches["src"].files["createTree.ts"]).toBeDefined();
    expect(tree.branches["src"].files["createTree.spec.ts"]).toBeDefined();
  });

  it("Should be able to handle generic input", () => {
    const input = [
      {
        path: "src/index.ts",
        name: "index",
        type: "file",
      },
      {
        path: "src/createTree.ts",
        name: "createTree",
        type: "image",
      },
    ];

    const tree = createTree(input);

    console.log(JSON.stringify(tree));

    expect(tree.branches["src"].files["index.ts"]).toBeDefined();
    expect(tree.branches["src"].files["index.ts"].type).toBe("file");

    expect(tree.branches["src"].files["createTree.ts"]).toBeDefined();
    expect(tree.branches["src"].files["createTree.ts"].type).toBe("image");
  });
});
