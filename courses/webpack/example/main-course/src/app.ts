import ColorfulTree from './colorful.tree';

export const App = (): HTMLElement => {
    const container = document.createElement('div');

    const title = document.createElement('h1');
    title.innerText = 'Colorful Tree';
    container.appendChild(title);

    const treeEl = renderTree(ColorfulTree) as HTMLElement;
    container.appendChild(treeEl);

    return container;
}

const renderTree = (tree: Tree) => {
    const list = document.createElement('ul');
    const rootEl = document.createElement('li');
    rootEl.innerText = tree.name;
    list.appendChild(rootEl);
    
    const childrenEl = tree.children.map((child: Tree) => renderTree(child));
    childrenEl.forEach((childEl: HTMLElement) => {
        rootEl.appendChild(childEl)
    });

    return list;
}