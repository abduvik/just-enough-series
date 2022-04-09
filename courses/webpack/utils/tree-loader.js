module.exports = (content) => {
    const lines = content.split('\n').map(text => text.trim());
    const parsedContent = lines.map(line => line.match(/(.*)\s->\s(.*)/s)).filter(match => !!match);
    const parentChild = parsedContent.map(([_, parent, child]) => ({ parent, child }));
    const tree = {};

    parentChild.forEach(({ parent, child }) => {
        if (!tree[parent]) {
            tree[parent] = {name: parent, children: []};
        }

        if (!tree[child]) {
            tree[child] = {name: child, children: []};
        }

        tree[parent].children.push(tree[child])
    });
    return `export default ${JSON.stringify(tree.root)}`;
}