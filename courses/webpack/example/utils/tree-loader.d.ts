type Tree = {
    name: string;
    children: Tree[];
}

declare module "*.tree" {
    const tree: Tree
    export default tree;
}