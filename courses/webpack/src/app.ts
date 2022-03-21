// @ts-ignore  
import ColorfulTree from './colorful.tree';

export const App = (): HTMLElement => {
    const container = document.createElement('div');

    const title = document.createElement('h1');
    title.innerText = 'Colorful Tree';
    container.appendChild(title);

    const treeEl = renderTree(ColorfulTree) as any;
    container.appendChild(treeEl);

    return container;
}

const renderTree = (tree: any) => {
    const list = document.createElement('ul');
    const rootEl = document.createElement('li');
    rootEl.innerText = tree.name;
    list.appendChild(rootEl);
    
    const childrenEl = tree.children.map((child: any) => renderTree(child));
    childrenEl.forEach((childEl: any) => {
        rootEl.appendChild(childEl)
    });

    return list;
}